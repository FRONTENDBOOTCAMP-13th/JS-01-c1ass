const container = document.querySelector('#mac-panel-container');
const icon_bar = document.querySelector('#icon-bar');
const icon_arr = icon_bar!.querySelectorAll('.icon');

Array.from(icon_arr).forEach((e, i) => {
  e.addEventListener('click', () => {
    openPanel(i);
  });
});

function openPanel(idx: number) {
  const mac_panel_overlay = createMacPanel();
  mac_panel_overlay.dataset.id = idx.toString();
  container?.appendChild(mac_panel_overlay);
}

function createMacPanel() {
  const mac_panel_overlay = document.createElement('li');
  mac_panel_overlay.classList.add('mac-panel-overlay');
  const mac_panel_content = document.createElement('div');
  mac_panel_content.classList.add('mac-panel-content');
  const mac_panel_header = document.createElement('div');
  mac_panel_header.classList.add('mac-panel-header');
  const mac_panel_title = document.createElement('div');
  mac_panel_title.classList.add('mac-panel-title');
  const mac_panel_header_left = document.createElement('div');
  mac_panel_header_left.classList.add('mac-panel-header-left');
  const mac_panel_header_right = document.createElement('div');
  mac_panel_header_right.classList.add('mac-panel-header-right');
  const mac_panel_program = document.createElement('div');
  mac_panel_program.classList.add('mac-panel-program');
  const close_mac_panel = document.createElement('div');
  close_mac_panel.classList.add('close-mac-panel');
  const minimize_mac_panel = document.createElement('div');
  minimize_mac_panel.classList.add('minimize-mac-panel');
  const full_mac_panel = document.createElement('div');
  full_mac_panel.classList.add('full-mac-panel');
  mac_panel_overlay.appendChild(mac_panel_content);
  mac_panel_content.appendChild(mac_panel_header);
  mac_panel_content.appendChild(mac_panel_program);
  mac_panel_header.appendChild(mac_panel_header_left);
  mac_panel_header.appendChild(mac_panel_title);
  mac_panel_header.appendChild(mac_panel_header_right);
  mac_panel_header_left.appendChild(close_mac_panel);
  mac_panel_header_left.appendChild(minimize_mac_panel);
  mac_panel_header_left.appendChild(full_mac_panel);
  return mac_panel_overlay;
}
