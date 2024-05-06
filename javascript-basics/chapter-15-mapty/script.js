'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
class App {
  markers = new Map(); // 用来存储点标记，实现弹出指定气泡的效果
  #workouts = [];
  #map;
  #mapEvent;
  constructor() {
    // 从localstorage获取数据
    this.#getFromLocalStorage();
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this)); // 表单提交事件
    inputType.addEventListener('change', this._toggleElevationField); // 锻炼类型选择事件
    containerWorkouts.addEventListener('click', this.#move2Workout.bind(this));
    document
      .querySelector('#map')
      .addEventListener('click', this.#removeWorkout.bind(this));
  }
  _getPosition() {
    /// Geolocation API
    if (navigator.geolocation) {
      const failCallback = (e) => {
        console.log(e);
        alert('无法获取你的地理信息');
      };
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        failCallback
      );
    }
  }

  // 加载地图界面
  _loadMap(position) {
    // const { latitude, longitude } = position.coords;
    // const coords = [longitude, latitude];
    AMapLoader.load({
      key: key, //申请好的Web端开发者 Key，调用 load 时必填
      version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    })
      .then((AMap) => {
        this.#map = new AMap.Map('map', {
          zoom: 13,
          viewMode: '3D',
          center: [117.212033, 31.802601], // 获取的地理位置有点问题，直接写死了
        });
        this.#map.on('click', this._showForm.bind(this));
        // 如果有本地数据先渲染
        if (this.#workouts.length > 0) {
          this.#workouts.forEach((workout) => {
            this.#renderWorkoutTag(workout);
          });
        }
      })
      .catch((e) => {
        console.error(e); //加载错误提示
      });
  }

  // 点击地图时候，生成显示表单
  _showForm(event) {
    this.#mapEvent = event;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  // 提交表单，创建新的条目
  _newWorkout(e) {
    const validNumber = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));
    const validPositive = (...inputs) => inputs.every((inp) => inp > 0);
    e.preventDefault();

    // 获取表单元素
    const { lng, lat } = this.#mapEvent.lnglat;
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    let workout;
    // 检查表单数据
    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        !validNumber(distance, duration, cadence) ||
        !validPositive(distance, duration, cadence)
      ) {
        return alert('数据应当是大于0的数字');
      }
      workout = new Running([lng, lat], distance, duration, cadence);
    }
    if (type === 'cycling') {
      const elevation = Number(inputElevation.value);
      if (
        !validNumber(distance, duration, elevation) ||
        !validPositive(distance, duration)
      ) {
        return alert('数据应当是大于0的数字');
      }
      workout = new Cycling([lng, lat], distance, duration, elevation);
    }
    // 对应类型，添加到workouts
    this.#workouts.push(workout);
    // 展示标记点
    this.#renderWorkoutTag(workout);
    // 渲染左侧数据
    this.#renderWorkout(workout);
    // 保存到localstorage
    this.#setLocalStorage();
    // 表单重置
    // 处理闪一下的问题
    form.style.display = 'none';
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
    form.classList.add('hidden');

    form.reset();
  }
  // 切换cycling/running
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  // 用于创建标签气泡元素
  #createPop(workout) {
    const finalContent = `
    <div class='pop ${workout.type}-popup' data-id=${workout.id}>
    ${workout.type === 'running' ? '🏃' : '🚵‍♀️'} ${workout._getDesc()}
        <button class="close-btn">&times;</button>
    </div>`;
    return new AMap.InfoWindow({
      //创建信息窗体
      isCustom: true, //使用自定义窗体
      content: finalContent, //信息窗体的内容可以是任意html片段
      offset: new AMap.Pixel(16, -45),
    });
  }
  // 渲染点标记
  #renderWorkoutTag(workout) {
    const marker = new AMap.Marker({
      position: workout.coords, //位置
    });
    this.#map.add(marker); //添加到地图
    const infoWindow = this.#createPop(workout);
    // AMap.event.addListener(marker, 'click', function (e) {
    //   this.infoWindow.open(map, e.target.getPosition());
    // });
    infoWindow.open(this.#map, marker.getPosition());
    // 高德地图的API对于点标记的内容一次只能显示一个，所以改成触摸显示，
    AMap.Event.addListener(marker, 'mouseover', (e) => {
      infoWindow.open(this.#map, marker.getPosition());
    });
    this.markers.set(workout.id, { marker, infoWindow });
  }
  // 渲染左侧项目栏
  #renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout._getDesc()}</h2>
        <div class="workout__details">
        <span class="workout__icon"> ${
          workout.type === 'running' ? '🏃' : '🚵‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
        </div>`;
    if (workout.type === 'running') {
      html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(2)}</span>
            <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
        </div>
    </li>`;
    } else {
      html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(2)}</span>
            <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
        </div>
        </li>`;
    }
    form.insertAdjacentHTML('afterend', html);
  }
  // 移动到指定点标记
  #move2Workout(e) {
    const target = e.target.closest('.workout');
    if (!target) return;
    const id = target.dataset.id;
    const workout = this.#workouts.find((wk) => wk.id === id);
    this.#map.setCenter(workout.coords);
    // 显示指定点标记的气泡
    const { marker, infoWindow } = this.markers.get(id);
    infoWindow.open(this.#map, marker.getPosition());
  }

  #removeWorkout(e) {
    if (!e.target.classList.contains('close-btn')) return;
    const pop = e.target.closest('.pop');
    const id = pop.dataset.id;
    const index = this.#workouts.findIndex((workout) => {
      workout.id = id;
    });
    // 两个参数表示从index开始删除n个元素
    this.#workouts.splice(index, 1);
    //
    const { marker, infoWindow } = this.markers.get(id);
    marker.remove(); // 删除点标记
    infoWindow.close(); // 关闭气泡
    this.markers.delete(id); ///删除缓存
  }
  #getFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    data.forEach((d) => {
      if (d.type === 'running') {
        this.#workouts.push(Running.generateRunning(d));
      } else {
        this.#workouts.push(Cycling.generateCycling(d));
        console.log(d.date);
      }
    });
    this.#workouts.forEach((workout) => {
      this.#renderWorkout(workout);
    });
  }
  #setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  clearWorkout() {
    localStorage.removeItem('workouts');
  }
}

// 类
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(coords, distance, duration) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }
  _getDesc() {
    //忽略下一行的格式化
    // prettier-ignore
    const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',]
    return `${this.type[0].toUpperCase()}${this.type.slice(1)} ${
      months[this.date.getMonth()]
    } ${(this.date.getDate() + '').padStart(2, 0)} 号`;
  }
}
class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }
  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
  }
  static generateRunning(workout) {
    const running = new Running(
      workout.coords,
      workout.distance,
      workout.duration,
      workout.cadence
    );
    running.date = new Date(workout.date);
    running.id = workout.id;
    return running;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
  }
  static generateCycling(workout) {
    const cycling = new Running(
      workout.coords,
      workout.distance,
      workout.duration,
      workout.elevationGain
    );
    cycling.date = new Date(workout.date);
    cycling.id = workout.id;
    return cycling;
  }
}

const app = new App();
