let truckBtn, trailerBtn, menu;
let menuState = 'truck';
let data = {};
let saveData = '';
let savedNums = [];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const trucks = [4004, 4005, 4123, 4129, 4130, 4132, 4133, 4134, 4135, 4136, 4137, 4138, 4139, 4140, 4141, 4142, 4143, 4144, 4146, 4147, 4148, 4149, 4150, 4151];
trucks.map(t => t.toString());

const trailers = [
  '7301',
  '7322',
  '7323',
  '7324',
  '7325',
  '7326',
  '7327',
  '7328',
  '7329',
  '7330',
  '7331',
  '7332',
  '7333',
  '7334',
  '7335',
  '7336',
  '7337',
  '7338',
  '7339',
  '7340',
  '7341',
];
trucks.map(t => t.toString());

function main() {
  truckBtn = document.getElementById('truckBtn');
  trailerBtn = document.getElementById('trailerBtn');
  menu = document.getElementById('menu');

  //Setup base button colors / states
  truckBtn.style.background = '#e7e7e7';
  trailerBtn.style.background = '#a7a7a7';
  truckBtn.style.color = '#000';
  trailerBtn.style.color = '#555';

  loadMenu();
}

function changeMenu(type) {
  switch (type) {
    case 'truck':
      truckBtn.style.background = '#e7e7e7';
      trailerBtn.style.background = '#a7a7a7';
      truckBtn.style.color = '#000';
      trailerBtn.style.color = '#555';
      menuState = 'truck';
      break;
    case 'trailer':
      trailerBtn.style.background = '#e7e7e7';
      truckBtn.style.background = '#a7a7a7';
      trailerBtn.style.color = '#000';
      truckBtn.style.color = '#555';
      menuState = 'trailer';
      break;
    case 'view':
      trailerBtn.style.background = '#a7a7a7';
      truckBtn.style.background = '#a7a7a7';
      trailerBtn.style.color = '#555';
      truckBtn.style.color = '#555';
      menuState = 'view';
      break;
  }
  loadMenu();
}

function loadMenu() {
  let dropdown = document.querySelector('select');

  const nodes = [...dropdown.childNodes];
  totalChildren = nodes.length;
  for (let i = 0; i < totalChildren; i++) {
    dropdown.removeChild(nodes[i]);
  }

  if (menuState == 'truck') {
    document.getElementById('steer').style.visibility = 'visible';
    document.getElementById('steer').style.position = 'static';
    document.getElementById('fDrive').style.visibility = 'visible';
    document.getElementById('fDrive').style.position = 'static';
    document.getElementById('rDrive').style.visibility = 'visible';
    document.getElementById('rDrive').style.position = 'static';

    document.getElementById('tNumber').style.visibility = 'visible';
    document.getElementById('tNumber').style.position = 'absolute';
    document.getElementById('confirm').style.visibility = 'visible';
    document.getElementById('confirm').style.position = 'static';

    trucks.forEach(t => {
      const o = document.createElement('option');
      o.value = t;
      o.innerHTML = t;
      dropdown.appendChild(o);
    });
  } else if (menuState == 'trailer') {
    document.getElementById('steer').style.visibility = 'hidden';
    document.getElementById('steer').style.position = 'absolute';
    document.getElementById('fDrive').style.visibility = 'visible';
    document.getElementById('fDrive').style.position = 'static';
    document.getElementById('rDrive').style.visibility = 'visible';
    document.getElementById('rDrive').style.position = 'static';

    document.getElementById('tNumber').style.visibility = 'visible';
    document.getElementById('tNumber').style.position = 'absolute';
    document.getElementById('confirm').style.visibility = 'visible';
    document.getElementById('confirm').style.position = 'static';

    trailers.forEach(t => {
      const o = document.createElement('option');
      o.value = t;
      o.innerHTML = t;
      dropdown.appendChild(o);
    });
  }
}

function updateData() {
  const els = document.querySelectorAll('input');
  const vals = [...els].map(e => e.value);
  data['truck'] = document.getElementById('tNumber').value.toString();

  const d = new Date();
  data['date'] = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;

  for (let i = 0; i < vals.length; i++) {
    data[els[i].id] = vals[i];
  }
}

function confirm() {
  updateData();
  localStorage.setItem(document.getElementById('tNumber').value, JSON.stringify(data));
  document.querySelectorAll('input').forEach(e => {
    e.value = '';
  });

  if (!savedNums.includes(document.getElementById('tNumber').value)) {
    savedNums.push(document.getElementById('tNumber').value);
    saveData = saveData.concat(`[${savedNums[savedNums.length - 1]}],` + jsonToCsv(data) + '\n');
  } else {
    let splitData = saveData.split('\n');
    for (let i = 0; i < splitData.length; i++) {
      if (document.getElementById('tNumber').value == savedNums[i]) {
        savedNums.splice(i, 1);
        splitData.splice(i, 1);
        savedNums.push(document.getElementById('tNumber').value);
        splitData.push(`[${savedNums[savedNums.length - 1]}],` + jsonToCsv(data) + '\n');
        break;
      }
    }
    splitData.splice(splitData.length - 2, 1)
    saveData = splitData.join('\n')
  }
}

function jsonToCsv(json) {
  let newJson = JSON.stringify(json);
  while (typeof newJson != 'object') {
    newJson = JSON.parse(newJson);
  }

  if (menuState == 'truck') {
    return `${newJson.date},${newJson.mileage},${newJson.lSteerPSI},${newJson.lSteerOuter},${newJson.lSteerMiddle},${newJson.lSteerInner},${newJson.lFODrivePSI},${newJson.lFODriveOuter},${newJson.lFODriveMiddle},${newJson.lFODriveInner},${newJson.lFIDrivePSI},${newJson.lFIDriveOuter},${newJson.lFIDriveMiddle},${newJson.lFIDriveInner},${newJson.lRODrivePSI},${newJson.lRODriveOuter},${newJson.lRODriveMiddle},${newJson.lRODriveInner},${newJson.lRIDrivePSI},${newJson.lRIDriveOuter},${newJson.lRIDriveMiddle},${newJson.lRIDriveInner},${newJson.rSteerPSI},${newJson.rSteerOuter},${newJson.rSteerMiddle},${newJson.rSteerInner},${newJson.rFODrivePSI},${newJson.rFODriveOuter},${newJson.rFODriveMiddle},${newJson.rFODriveInner},${newJson.rFIDrivePSI},${newJson.rFIDriveOuter},${newJson.rFIDriveMiddle},${newJson.rFIDriveInner},${newJson.rRODrivePSI},${newJson.rRODriveOuter},${newJson.rRODriveMiddle},${newJson.rRODriveInner},${newJson.rRIDrivePSI},${newJson.rRIDriveOuter},${newJson.rRIDriveMiddle},${newJson.rRIDriveInner},`;
  } else {
    return `${newJson.date},${newJson.lFODrivePSI},${newJson.lFODriveOuter},${newJson.lFODriveMiddle},${newJson.lFODriveInner},${newJson.lFIDrivePSI},${newJson.lFIDriveOuter},${newJson.lFIDriveMiddle},${newJson.lFIDriveInner},${newJson.lRODrivePSI},${newJson.lRODriveOuter},${newJson.lRODriveMiddle},${newJson.lRODriveInner},${newJson.lRIDrivePSI},${newJson.lRIDriveOuter},${newJson.lRIDriveMiddle},${newJson.lRIDriveInner},${newJson.rFODrivePSI},${newJson.rFODriveOuter},${newJson.rFODriveMiddle},${newJson.rFODriveInner},${newJson.rFIDrivePSI},${newJson.rFIDriveOuter},${newJson.rFIDriveMiddle},${newJson.rFIDriveInner},${newJson.rRODrivePSI},${newJson.rRODriveOuter},${newJson.rRODriveMiddle},${newJson.rRODriveInner},${newJson.rRIDrivePSI},${newJson.rRIDriveOuter},${newJson.rRIDriveMiddle},${newJson.rRIDriveInner},`;
  }
}

function download(text, name, type) {
  var a = document.createElement('a');
  a.onclick = e => {
    var file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
  };

  a.click();
}

function save() {
  download(saveData, `${data.date}.csv`, 'text/plain');
}
