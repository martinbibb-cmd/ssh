const commands = [
  {
    title: "SSH into Daedalus",
    category: "SSH",
    when: "Start here",
    tags: ["ssh", "login", "connect", "terminal"],
    description: "Open the VM shell before running Docker or system checks.",
    command: "ssh {host}"
  },
  {
    title: "Running Docker containers",
    category: "Docker",
    when: "Status",
    tags: ["docker", "running", "containers", "ps", "status"],
    description: "Shows containers that are currently up.",
    command: "docker ps"
  },
  {
    title: "All Docker containers",
    category: "Docker",
    when: "Status",
    tags: ["docker", "crashed", "exited", "containers", "ps", "137", "255"],
    description: "Shows running and stopped containers, including crashed app containers.",
    command: "docker ps -a"
  },
  {
    title: "App logs",
    category: "Docker",
    when: "Debug",
    tags: ["logs", "error", "crash", "debug", "app", "container"],
    description: "Prints recent logs for the app container.",
    command: "docker logs {container}"
  },
  {
    title: "Follow app logs live",
    category: "Docker",
    when: "Debug",
    tags: ["logs", "live", "follow", "tail", "ctrl c"],
    description: "Streams live logs. Press CTRL+C to stop watching.",
    command: "docker logs -f {container}"
  },
  {
    title: "Restart app container",
    category: "Docker",
    when: "Fix",
    tags: ["restart", "fix", "container", "app", "502"],
    description: "Restarts the main app container without touching the rest of the stack.",
    command: "docker restart {container}"
  },
  {
    title: "Restart all running containers",
    category: "Docker",
    when: "Fix",
    tags: ["restart", "everything", "all", "containers"],
    description: "Restarts every container that is currently running.",
    command: "docker restart $(docker ps -q)"
  },
  {
    title: "Stop app container",
    category: "Docker",
    when: "Control",
    tags: ["stop", "container", "app"],
    description: "Stops the app container.",
    command: "docker stop {container}"
  },
  {
    title: "Start app container",
    category: "Docker",
    when: "Control",
    tags: ["start", "container", "app"],
    description: "Starts a stopped app container.",
    command: "docker start {container}"
  },
  {
    title: "Inspect app health",
    category: "Docker",
    when: "Health",
    tags: ["health", "inspect", "container", "status"],
    description: "Shows detailed container metadata, including health checks when configured.",
    command: "docker inspect {container}"
  },
  {
    title: "Short health check",
    category: "Docker",
    when: "Health",
    tags: ["health", "grep", "inspect", "short"],
    description: "Filters inspect output down to health-related lines.",
    command: "docker inspect {container} | grep Health"
  },
  {
    title: "Go to compose folder",
    category: "Compose",
    when: "Setup",
    tags: ["compose", "folder", "cd", "services"],
    description: "Move into the folder where Docker Compose commands should run.",
    command: "cd {folder}"
  },
  {
    title: "Compose service status",
    category: "Compose",
    when: "Status",
    tags: ["compose", "status", "services", "ps"],
    description: "Shows status for services in the current Compose stack.",
    command: "cd {folder}\ndocker compose ps"
  },
  {
    title: "Restart Compose stack",
    category: "Compose",
    when: "Fix",
    tags: ["compose", "restart", "stack", "502"],
    description: "Restarts services defined in the Compose file.",
    command: "cd {folder}\ndocker compose restart"
  },
  {
    title: "Rebuild Compose stack",
    category: "Compose",
    when: "Deploy",
    tags: ["compose", "rebuild", "build", "deploy", "update"],
    description: "Rebuilds images and starts the stack in the background.",
    command: "cd {folder}\ndocker compose up -d --build"
  },
  {
    title: "Pull latest images",
    category: "Compose",
    when: "Deploy",
    tags: ["compose", "pull", "latest", "images", "update"],
    description: "Downloads newer images for services in the Compose file.",
    command: "cd {folder}\ndocker compose pull"
  },
  {
    title: "Bring Compose stack up",
    category: "Compose",
    when: "Control",
    tags: ["compose", "up", "start", "background"],
    description: "Starts the Compose stack in detached mode.",
    command: "cd {folder}\ndocker compose up -d"
  },
  {
    title: "Bring Compose stack down",
    category: "Compose",
    when: "Control",
    tags: ["compose", "down", "stop"],
    description: "Stops and removes Compose-managed containers.",
    command: "cd {folder}\ndocker compose down"
  },
  {
    title: "Cloudflare tunnel container",
    category: "Tunnel",
    when: "Status",
    tags: ["cloudflare", "cloudflared", "tunnel", "status", "502"],
    description: "Checks whether the Cloudflare Tunnel container is running.",
    command: "docker ps | grep cloudflared"
  },
  {
    title: "Cloudflare tunnel logs",
    category: "Tunnel",
    when: "Debug",
    tags: ["cloudflare", "cloudflared", "tunnel", "logs", "edge", "registered"],
    description: "A healthy tunnel usually reports edge connections and registered tunnel connections.",
    command: "docker logs -f daedalus-cloudflared"
  },
  {
    title: "Check local website",
    category: "Network",
    when: "502",
    tags: ["curl", "localhost", "website", "502", "connection refused", "html"],
    description: "If this returns HTML, the app is alive locally. If it refuses, the app is down.",
    command: "curl http://localhost:{port}"
  },
  {
    title: "Check listening ports",
    category: "Network",
    when: "Status",
    tags: ["ports", "ss", "listen", "3000", "8080", "5432"],
    description: "Shows listening ports and which processes own them.",
    command: "ss -tulpn"
  },
  {
    title: "Check disk space",
    category: "System",
    when: "Common killer",
    tags: ["disk", "space", "full", "100", "docker"],
    description: "A full disk is a common cause of Docker failures.",
    command: "df -h"
  },
  {
    title: "Check memory",
    category: "System",
    when: "Pressure",
    tags: ["ram", "memory", "free", "oom", "137"],
    description: "Shows available RAM and swap.",
    command: "free -h"
  },
  {
    title: "Check CPU",
    category: "System",
    when: "Pressure",
    tags: ["cpu", "htop", "processes", "load"],
    description: "Interactive process viewer for CPU and memory pressure.",
    command: "htop"
  },
  {
    title: "Install htop",
    category: "System",
    when: "Setup",
    tags: ["install", "htop", "apt", "cpu"],
    description: "Installs htop if the command is missing.",
    command: "sudo apt install htop"
  },
  {
    title: "Recent system errors",
    category: "System",
    when: "Debug",
    tags: ["journalctl", "errors", "systemd", "recent"],
    description: "Shows recent systemd journal errors and context.",
    command: "journalctl -xe"
  },
  {
    title: "Current boot logs",
    category: "System",
    when: "Debug",
    tags: ["journalctl", "boot", "logs"],
    description: "Shows logs from the current boot.",
    command: "journalctl -b"
  },
  {
    title: "Update Git repo",
    category: "Git",
    when: "Deploy",
    tags: ["git", "pull", "update", "repo"],
    description: "Pulls the latest changes in the current repository.",
    command: "git pull"
  },
  {
    title: "Check Git branch",
    category: "Git",
    when: "Status",
    tags: ["git", "branch", "repo"],
    description: "Shows the current Git branch.",
    command: "git branch"
  },
  {
    title: "Check Git status",
    category: "Git",
    when: "Status",
    tags: ["git", "status", "changes", "repo"],
    description: "Shows changed files in the current repository.",
    command: "git status"
  },
  {
    title: "Typical Cloudflare 502 investigation",
    category: "Workflow",
    when: "502",
    tags: ["502", "panic", "workflow", "cloudflare", "outage", "down"],
    description: "A practical sequence for checking whether Docker, the app, or the tunnel is at fault.",
    command: "docker ps\ndocker ps -a\ndocker logs {container}\ncurl http://localhost:{port}\ndocker restart {container}\ncd {folder}\ndocker compose up -d"
  },
  {
    title: "Panic sheet",
    category: "Workflow",
    when: "Outage",
    tags: ["panic", "sheet", "down", "quick", "outage"],
    description: "The short list to run when Daedalus is down and you need signal fast.",
    command: "docker ps\ndocker ps -a\ncd {folder}\ndocker compose ps\ndocker logs -f {container}\ndocker compose restart\ndocker compose up -d --build\ncurl http://localhost:{port}\ndf -h\nfree -h"
  }
];

const state = {
  query: "",
  settings: {
    host: "martin@daedalus-runner",
    container: "daedalus-app",
    folder: "~/daedalus-services",
    port: "3000"
  }
};

const refs = {
  search: document.querySelector("#searchInput"),
  clear: document.querySelector("#clearButton"),
  results: document.querySelector("#results"),
  count: document.querySelector("#resultCount"),
  template: document.querySelector("#commandTemplate"),
  toast: document.querySelector("#toast"),
  copyVisible: document.querySelector("#copyVisibleButton"),
  install: document.querySelector("#installButton"),
  settings: {
    host: document.querySelector("#hostInput"),
    container: document.querySelector("#containerInput"),
    folder: document.querySelector("#folderInput"),
    port: document.querySelector("#portInput")
  }
};

let installPrompt = null;
let visibleCommands = [];

function loadSettings() {
  const saved = localStorage.getItem("ssh-workbench-settings");
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    state.settings = { ...state.settings, ...parsed };
  } catch {
    localStorage.removeItem("ssh-workbench-settings");
  }
}

function saveSettings() {
  localStorage.setItem("ssh-workbench-settings", JSON.stringify(state.settings));
}

function commandText(command) {
  return command
    .replaceAll("{host}", state.settings.host)
    .replaceAll("{container}", state.settings.container)
    .replaceAll("{folder}", state.settings.folder)
    .replaceAll("{port}", state.settings.port);
}

function haystack(item) {
  return [
    item.title,
    item.category,
    item.when,
    item.description,
    item.command,
    ...item.tags
  ].join(" ").toLowerCase();
}

function getMatches() {
  const query = state.query.trim().toLowerCase();
  if (!query) return commands;

  const terms = query.split(/\s+/).filter(Boolean);
  return commands.filter((item) => terms.every((term) => haystack(item).includes(term)));
}

function showToast(message) {
  refs.toast.textContent = message;
  refs.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => refs.toast.classList.remove("show"), 1700);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  showToast("Copied to clipboard");
}

function render() {
  refs.results.replaceChildren();
  visibleCommands = getMatches();

  refs.count.textContent = visibleCommands.length === 1
    ? "1 command"
    : `${visibleCommands.length} commands`;

  if (!visibleCommands.length) {
    const empty = document.createElement("p");
    empty.className = "description";
    empty.textContent = "No matches. Try 502, logs, restart, tunnel, disk, RAM, Compose, or Git.";
    refs.results.append(empty);
    return;
  }

  for (const item of visibleCommands) {
    const node = refs.template.content.firstElementChild.cloneNode(true);
    node.querySelector(".category").textContent = item.category;
    node.querySelector(".when").textContent = item.when;
    node.querySelector("h3").textContent = item.title;
    node.querySelector(".description").textContent = item.description;
    node.querySelector("code").textContent = commandText(item.command);
    node.querySelector(".copy-button").addEventListener("click", () => copyText(commandText(item.command)));
    refs.results.append(node);
  }
}

function syncSettingsInputs() {
  for (const [key, input] of Object.entries(refs.settings)) {
    input.value = state.settings[key];
  }
}

function bindEvents() {
  refs.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
  });

  refs.clear.addEventListener("click", () => {
    state.query = "";
    refs.search.value = "";
    refs.search.focus();
    render();
  });

  refs.copyVisible.addEventListener("click", () => {
    const text = visibleCommands.map((item) => commandText(item.command)).join("\n\n");
    if (text) copyText(text);
  });

  document.querySelectorAll("[data-query]").forEach((button) => {
    button.addEventListener("click", () => {
      state.query = button.dataset.query;
      refs.search.value = state.query;
      render();
    });
  });

  for (const [key, input] of Object.entries(refs.settings)) {
    input.addEventListener("input", () => {
      state.settings[key] = input.value.trim() || input.defaultValue;
      saveSettings();
      render();
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    refs.install.hidden = false;
  });

  refs.install.addEventListener("click", async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    refs.install.hidden = true;
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}

loadSettings();
syncSettingsInputs();
bindEvents();
render();
