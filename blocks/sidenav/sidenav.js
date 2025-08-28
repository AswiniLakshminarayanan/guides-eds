import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"","url":"","children":[{"displayName":"","url":""},{"displayName":"","url":""},{"displayName":"Legal Notifications","url":"contents/traveldita/legal/legal"},{"displayName":"Inline Comments and Feedback","url":"contents/review/inline-comments-and-feedback"},{"displayName":"Contact Informations","url":"contents/traveldita/contacts/contacts"},{"displayName":"Airspeed limitations","url":"contents/traveldita/operatinglimitations/r-airspeed-limitations"},{"displayName":"Engine limitations","url":"contents/traveldita/operatinglimitations/r-engine-limitations"},{"displayName":"Braking","url":"contents/traveldita/systems/c-braking"}]},{"displayName":"General description","url":"","children":[{"displayName":"General description","url":"contents/traveldita/generaldescription/general-description"},{"displayName":"History of flight","url":"contents/traveldita/generaldescription/c-history-of-flight"},{"displayName":"Overview","url":"","children":[{"displayName":"Overview","url":"contents/traveldita/generaldescription/c-overview"},{"displayName":"Spaceship requirements","url":"contents/traveldita/generaldescription/r-spaceship-requirements"},{"displayName":"Launch and landing sites","url":"contents/traveldita/generaldescription/r-launch-and-landing-site"}]},{"displayName":"Vehicle structure","url":"","children":[{"displayName":"Vehicle structure","url":"contents/traveldita/generaldescription/c-vehicle-structure"},{"displayName":"Crew area","url":"","children":[{"displayName":"Crew area","url":"contents/traveldita/generaldescription/c-crew-area"},{"displayName":"Adjust the seat temperature","url":"contents/traveldita/generaldescription/t-adjust-the-seat-temperature"},{"displayName":"Change the seat temperature display","url":"contents/traveldita/generaldescription/t-change-the-seat-temperature-display"},{"displayName":"Recline the seats","url":"contents/traveldita/generaldescription/t-recline-the-seats"},{"displayName":"Adjust the lighting levels","url":"contents/traveldita/generaldescription/t-adjust-the-lighting-levels"},{"displayName":"Use the drink dispenser","url":"contents/traveldita/generaldescription/t-use-the-drink-dispenser"}]},{"displayName":"Wings","url":"contents/traveldita/generaldescription/c-wing"},{"displayName":"Thermal protection","url":"contents/traveldita/generaldescription/c-thermal-protection"}]}]},{"displayName":"Systems","url":"","children":[{"displayName":"Systems","url":"contents/traveldita/systems/systems"},{"displayName":"Escape system","url":"","children":[{"displayName":"Escape system","url":"contents/traveldita/systems/c-escape-system"},{"displayName":"Launch pad escape","url":"contents/traveldita/systems/c-launch-pad-escape"},{"displayName":"Cabin escape","url":"contents/traveldita/systems/c-cabin-escape"},{"displayName":"Landing escape","url":"contents/traveldita/systems/c-landing-escape"}]},{"displayName":"Crew and passenger system","url":"","children":[{"displayName":"Crew and passenger system","url":"contents/traveldita/systems/c-crew-and-passenger-system"},{"displayName":"Hygiene","url":"contents/traveldita/systems/c-hygiene"},{"displayName":"Sleep","url":"contents/traveldita/systems/c-sleep"}]},{"displayName":"Landing system","url":"","children":[{"displayName":"Landing system","url":"contents/traveldita/systems/c-landing-system"},{"displayName":"Landing gear","url":"contents/traveldita/systems/c-landing-gear"},{"displayName":"Braking","url":"contents/traveldita/systems/c-braking"}]}]},{"displayName":"Operating limitations","url":"","children":[{"displayName":"Operating limitations","url":"contents/traveldita/operatinglimitations/operating-limitations"},{"displayName":"Engine limitations","url":"contents/traveldita/operatinglimitations/r-engine-limitations"},{"displayName":"Airspeed limitations","url":"","children":[{"displayName":"Airspeed limitations","url":"contents/traveldita/operatinglimitations/r-airspeed-limitations"},{"displayName":"Takeoff","url":"contents/traveldita/operatinglimitations/r-takeoff"},{"displayName":"Entry","url":"contents/traveldita/operatinglimitations/r-entry"},{"displayName":"Landings","url":"contents/traveldita/operatinglimitations/r-landing"}]}]},{"displayName":"","url":"","children":[{"displayName":"Entry","url":"contents/traveldita/operatinglimitations/r-entry"},{"displayName":"Engine limitations","url":"contents/traveldita/operatinglimitations/r-engine-limitations"},{"displayName":"Landing","url":"contents/traveldita/operatinglimitations/r-landing"},{"displayName":"Takeoff","url":"contents/traveldita/operatinglimitations/r-takeoff"},{"displayName":"Cabin escape","url":"contents/traveldita/systems/c-cabin-escape"},{"displayName":"","url":""}]}]
const mapTitle = "Personal Spaceship Operations Manual"
const isDesktop = window.matchMedia("(min-width: 900px)");

function expandHeirarchy(element, root) {
  if (element === root) return;
  let parent = element.parentElement;
  parent.classList.remove("closed");
  expandHeirarchy(parent, root);
}

function expandSelection(parent) {
  let queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  let id = params.get("expand");
  let element = document.getElementById(`sidenav-li-${id}`);
  if (!element) return;
  element.classList.add("selected");
  expandHeirarchy(element, parent);
  element.scrollIntoView();
}

function scrollSidenavSelectionToView() {
  const element = document.querySelector('.sidenav-list-item.selected')
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  if(!element) return
  if (element.offsetTop < sidenavContainer.scrollTop || element.offsetTop + element.offsetHeight > sidenavContainer.scrollTop + sidenavContainer.clientHeight) {
    sidenavContainer.scrollTo({
      top: Math.max(element.offsetTop - 110, 0),
      behavior: 'smooth'
    });
  }
}



function addResizeBar() {
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  const div = document.createElement("div");
  div.classList.add('sidenav-resize-bar');
  let isResizing = false
  div.addEventListener('mousedown', (evt) => {
    isResizing = true
    document.addEventListener('mousemove', function (event) {
      if (isResizing) {
        let newWidth = event.pageX - sidenavContainer.offsetLeft;
        sidenavContainer.style.width = `${newWidth}px`;
      }
    })
  })
  document.addEventListener('mouseup', function () {
    if (isResizing) {
      isResizing = false;
    }
  })
  sidenavContainer.insertAdjacentElement("afterend", div)
}

function addExpandCollapseButton() {
  const divWrapper = document.createElement("div");
  divWrapper.classList.add('title-close-wrapper')
  const titleSpan = document.createElement("span");
  titleSpan.classList.add('title-span')
  titleSpan.textContent = mapTitle
  const span = document.createElement("span");
  span.classList.add('sidenav-expand-collapse')
  span.classList.add('open')
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  span.addEventListener('click', () => {
    const isOpen = span.classList.contains('open')
    const sidenavResizer = document.getElementsByClassName("sidenav-resize-bar")[0];
    if(!isOpen) {
      sidenavContainer.classList.remove('collapse-width')
      sidenavResizer.classList.remove('force-hide')
    } else {
      sidenavContainer.classList.add('collapse-width')
      sidenavResizer.classList.add('force-hide')
    }
    span.classList.toggle("open");
  })
  divWrapper.append(titleSpan)
  divWrapper.append(span)
  sidenavContainer.prepend(divWrapper)
}

function generateId(prefix, suffix) {
  if(prefix) {
      return `${prefix}-${suffix}`
  }
  return `${suffix}`
}


window.addEventListener('aem-app-ready', () => {
  scrollSidenavSelectionToView()
})


function createTree(parent, data, prefix, level) {
  const ul = document.createElement("ul");
  ul.classList.add("tree");
  parent.appendChild(ul);
  data.forEach((item, idx) => {
    const li = document.createElement("li");
    const newPrefix = generateId(prefix, level)
    const _id = generateId(newPrefix, idx);
    li.setAttribute("id", `sidenav-li-${_id}`);
    ul.appendChild(li);
    const anchor = document.createElement("a");
    const span = document.createElement("span");
    span.classList.add("chevron-icon-span");
    anchor.textContent = item.displayName;
    anchor.setAttribute("data-li-id", _id);
    anchor.setAttribute("title", item.displayName);
    anchor.setAttribute("aria-label", item.displayName);
    const siteURL =
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "");
    if (item.url) {
      let navURL = new URL(item.url, siteURL).href;
      anchor.setAttribute("href", navURL);
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        onClick(anchor.getAttribute("data-li-id"), navURL);
      });
    }
    li.classList.add("sidenav-list-item");
    li.classList.add("closed");
    if (item.children) {
      li.classList.add("has-children");
      const wrapperSpan = document.createElement("span");
      wrapperSpan.classList.add("chevron-text-wrapper");
      wrapperSpan.appendChild(span);
      wrapperSpan.appendChild(anchor);
      li.appendChild(wrapperSpan);
      createTree(li, item.children, newPrefix, idx);
    } else {
      li.appendChild(anchor);
    }
  });
}

function onClick(id, navURL) {
  const url = new URL(navURL);
  url.searchParams.set("expand", id); // set the query parameter
  window.location.href = url.toString(); // navigate
}

// Get the treeview element and create the tree
const treeview = document.getElementsByClassName("sidenav")[0];
addExpandCollapseButton();
createTree(treeview, treeData, '', '');
migrateTree(isDesktop);
addResizeBar(treeview);
isDesktop.addEventListener("change", () => migrateTree(isDesktop));
expandSelection(treeview);

// Add click event listener to each span element
treeview.querySelectorAll("span").forEach((span) => {
  span.addEventListener("click", (event) => {
    // Toggle the "closed" class on the parent li element
    event.currentTarget.parentNode.classList.toggle("closed");
  });
});