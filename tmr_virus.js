function fetchAndDisplayProxies(url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const proxyListElement = document.getElementById('proxyList');
      proxyListElement.innerHTML = '';
      const proxies = data.trim().split('\n');
      proxies.forEach(proxy => {
        const li = document.createElement('li');
        li.textContent = proxy;
        li.classList.add('proxy-item');
        proxyListElement.appendChild(li);
      });
      document.getElementById('proxyCount').textContent = proxies.length;
    })
    .catch(error => console.error('Error fetching proxies:', error));
}

function copyProxies() {
  const proxyListElement = document.getElementById('proxyList');
  const proxies = Array.from(proxyListElement.children).map(proxy => proxy.textContent).join('\n');
  navigator.clipboard.writeText(proxies)
    .then(() => alert('Proxies copied to clipboard'))
    .catch(error => console.error('Error copying proxies:', error));
}

function deleteAllProxies() {
  const proxyListElement = document.getElementById('proxyList');
  proxyListElement.innerHTML = '';
  document.getElementById('proxyCount').textContent = '0';
}



function saveProxies() {
  const proxyListElement = document.getElementById('proxyList');
  const proxies = Array.from(proxyListElement.children).map(proxy => proxy.textContent).join('\n');
  const randomNum = Math.floor(Math.random() * 10000); 
  const fileName = `proxy_tmr_${randomNum}.txt`;

  const blob = new Blob([proxies], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 0);
}

document.getElementById('proxyType').addEventListener('change', function () {
  const proxyType = this.value;
  let proxyUrl = '';

  switch (proxyType) {
    case 'http':
      proxyUrl = 'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt';
      break;
    case 'socks4':
      proxyUrl = 'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks4.txt';
      break;
    case 'socks5':
      proxyUrl = 'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt';
      break;
    default:
      break;
  }

  if (proxyUrl !== '') {
    fetchAndDisplayProxies(proxyUrl);
  } else {
    alert('Vui Lòng Chọn Proxy!');
  }
});

fetchAndDisplayProxies('https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt');