import { eventsStore } from "./data.js";
import { createDomElement } from "./utils.js";
import { formatDate } from "./utils.js";

const allEventsDiv = document.querySelector(".all-events");
const eventTypeSelect = document.getElementById("any-type");
const eventDistanceSelect = document.getElementById("any-distance");
const eventCategorySelect = document.getElementById("any-category");

function createEvent(arr) {
  arr.forEach((eventElement) => {
    const link = createDomElement({ tag: "a", className: "all-events-link", href: "#" });
    allEventsDiv.append(link);
    const eventImageContainer = createDomElement({ tag: "div", className: "all-events-img-box" });
    link.append(eventImageContainer);
    const eventImage = createDomElement({ tag: "img", className: "all-events-img", src: eventElement.image });
    eventImageContainer.append(eventImage);
    const eventsDescription = createDomElement({ tag: "div", className: "all-events-info" });
    link.append(eventsDescription);
    const eventsDate = createDomElement({ tag: "p", className: "all-events-date", textValue: formatDate(eventElement.date) });
    const eventsHeader = createDomElement({ tag: "h3", className: "all-events-header", textValue: eventElement.title });
    const eventsCategory = createDomElement({ tag: "p", className: "all-events-category", textValue: eventElement.category });
    eventsDescription.append(eventsDate, eventsHeader, eventsCategory);
    if (eventElement.type === "online") {
      const onlineEventDiv = createDomElement({
          tag: "div",
          className: "all-events-online"
      });
  
      const smallOnlineEventDiv = createDomElement({
          tag: "div",
          className: "all-events-online-small"
      });
  
      const cameraImage = createDomElement({
          tag: "img",
          className: "all-events-online-img",
          src: "./img/camera.svg",
          alt: "online event"
      });
  
      const smallCameraImage = createDomElement({
          tag: "img",
          className: "all-events-online-small-img",
          src: "./img/camera.svg", 
          alt: "online event (small)"
      });
  
      const onlineEventText = createDomElement({
          tag: "span",
          textValue: "Online Event"
      });
  
      onlineEventDiv.append(cameraImage, onlineEventText);
      smallOnlineEventDiv.append(smallCameraImage, onlineEventText.cloneNode(true)); // Клонируем текст для второго div
  

      eventsDescription.append(onlineEventDiv, smallOnlineEventDiv);
  }
  
  
    if (eventElement.attendees) {
        const eventsAtendees = createDomElement({
          tag: "p",
          className: "all-events-atendees",
          textValue: `${eventElement.attendees} attendees`,
        });
        eventsDescription.append(eventsAtendees);
      }
  });
}
function clearEvents() {
  while (allEventsDiv.firstChild) {
    allEventsDiv.removeChild(allEventsDiv.firstChild);
  }
}
function filterEvents(arr) {
    const selectedType = eventTypeSelect.value === "all" ? undefined : eventTypeSelect.value;
    const selectedDistance = eventDistanceSelect.value === "any" ? undefined : eventDistanceSelect.value;
    const selectedCategory = eventCategorySelect.value === "any" ? undefined : eventCategorySelect.value;
    let filteredArr = arr;
    if (selectedType && selectedType !== "all") {
      filteredArr = filteredArr.filter((element) => element.type === selectedType);
    }
    if (selectedDistance) {
      filteredArr = filteredArr.filter((element) => String(element.distance) === selectedDistance);
    }
    if (selectedCategory) {
      filteredArr = filteredArr.filter((element) => element.category === selectedCategory);
    }
    clearEvents();
    createEvent(filteredArr);
  }
  
eventTypeSelect.addEventListener("change", () => {filterEvents(eventsStore)});
eventDistanceSelect.addEventListener("change", () => {filterEvents(eventsStore)});
eventCategorySelect.addEventListener("change", () => {filterEvents(eventsStore)});
createEvent(eventsStore);