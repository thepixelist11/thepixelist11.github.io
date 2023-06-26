let truckBtn, trailerBtn, menu;
let menuState = 'truck';
let data = {};

const trucks = [4004, 4005];
trucks.map(t => t.toString());

const trailers = ['0000'];
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
    document.getElementById('view').style.visibility = 'visible';
    document.getElementById('view').style.position = 'static';

    document.getElementById('data').style.display = 'none';

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
    document.getElementById('view').style.visibility = 'visible';
    document.getElementById('view').style.position = 'static';

    document.getElementById('data').style.display = 'none';

    trailers.forEach(t => {
      const o = document.createElement('option');
      o.value = t;
      o.innerHTML = t;
      dropdown.appendChild(o);
    });
  } else {
    document.getElementById('steer').style.visibility = 'hidden';
    document.getElementById('steer').style.position = 'absolute';
    document.getElementById('fDrive').style.visibility = 'hidden';
    document.getElementById('fDrive').style.position = 'absolute';
    document.getElementById('rDrive').style.visibility = 'hidden';
    document.getElementById('rDrive').style.position = 'absolute';

    document.getElementById('tNumber').style.visibility = 'hidden';
    document.getElementById('tNumber').style.position = 'absolute';
    document.getElementById('confirm').style.visibility = 'hidden';
    document.getElementById('confirm').style.position = 'absolute';
    document.getElementById('view').style.visibility = 'hidden';
    document.getElementById('view').style.position = 'absolute';

    updateData();
    document.getElementById('data').style.display = 'inline';

    const text = document.getElementById('data');
    const nodes = [...text.childNodes];
    totalChildren = nodes.length;
    for (let i = 0; i < totalChildren; i++) {
      text.removeChild(nodes[i]);
    }

    localStorage.length;
    for (const e in data) {
      const t = document.createElement('p');
      t.innerHTML = `${e}: ${data[e]}`;
      text.appendChild(t);
    }
  }
}

function updateData() {
  data['truck'] = document.getElementById('tNumber').value.toString()

  const els = document.querySelectorAll('input');
  const vals = [...els].map(e => e.value);

  const d = new Date();
  data['date'] = `${d.getDate()}/${d.getMonth().toString().length < 2 ? '0' + d.getMonth() : d.getMonth()}/${d.getFullYear().toString().substring(2)}`;
  
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
}
