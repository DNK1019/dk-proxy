let toggleButton = document.getElementById('proxyToggle');

// True: On, False: Off
let proxyStatus;
chrome.proxy.settings.get({}, (e) => {proxyStatus = e.value.mode != 'system'; updateUI();});

toggleButton.addEventListener("click", () => {
    if (proxyStatus) {
        chrome.proxy.settings.clear({scope: 'regular'});
        proxyStatus = false;
    } else {
        var config = {
            mode: "fixed_servers",
            rules: {
                proxyForHttp: {
                    scheme: "socks5",
                    host: "www.drewkrause.dev"
                }
            }
        };
        chrome.proxy.settings.set({value: config, scope: 'regular'});
        proxyStatus = true;
    }

    updateUI();
});

function updateUI() {
    if (proxyStatus) {
        toggleButton.innerText = 'Disable Proxy';
        document.body.style.backgroundColor = '#00ff00';
    } else {
        toggleButton.innerText = 'Enable Proxy';
        document.body.style.backgroundColor = '#ff0000';
    }
}