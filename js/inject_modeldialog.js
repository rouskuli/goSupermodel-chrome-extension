function injectScript(file, node) {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
	console.log(`incected '${file.split('/').slice(-1)}' to '${node}'`);
}

function injectStylesheet(file, node) {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement('link');
  s.setAttribute('type', 'text/css');
  s.rel = "stylesheet";
  s.setAttribute('href', file);
  th.appendChild(s);
}

// inject modeldialog js
injectScript( chrome.runtime.getURL('js/greet_button.js'), 'body');

injectStylesheet( chrome.runtime.getURL('css/modeldialog.css'), 'body');
