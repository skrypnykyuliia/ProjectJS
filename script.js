import { eventsStore } from "./data.js";
import { createDomElement, formatDate } from "./utils.js";

const allEventsDiv = document.querySelector(".all-events");
const eventTypeSelect = document.getElementById("any-type");
const eventDistanceSelect = document.getElementById("any-distance");
const eventCategorySelect = document.getElementById("any-category");

function createEvent(events) {
  events.forEach(eventElement => {
    const link = createDomElement({ tag: "a", className: "all-events-link", href: "#" });
    const eventImageContainer = createDomElement({ tag: "div", className: "all-events-img-box" });
    const eventImage = createDomElement({ tag: "img", className: "all-events-img", src: eventElement.image });
    const eventsDescription = createDomElement({ tag: "div", className: "all-events-info" });
    const eventsDate = createDomElement({ tag: "p", className: "all-events-date", textValue: formatDate(eventElement.date) });
    const eventsHeader = createDomElement({ tag: "h3", className: "all-events-header", textValue: eventElement.title });
    const eventsCategory = createDomElement({ tag: "p", className: "all-events-category", textValue: eventElement.category });

    allEventsDiv.append(link);
    link.append(eventImageContainer, eventsDescription);
    eventImageContainer.append(eventImage);
    eventsDescription.append(eventsDate, eventsHeader, eventsCategory);

    if (eventElement.type === "online") {
      const onlineEventDiv = createDomElement({ tag: "div", className: "all-events-online" });
      const smallOnlineEventDiv = createDomElement({ tag: "div", className: "all-events-online-small" });
      const cameraImage = createDomElement({ tag: "img", className: "all-events-online-img", src: "./img/camera.svg", alt: "online event" });
      const smallCameraImage = createDomElement({ tag: "img", className: "all-events-online-small-img", src: "./img/camera.svg", alt: "online event (small)" });
      const onlineEventText = createDomElement({ tag: "span", textValue: "Online Event" });

      onlineEventDiv.append(cameraImage, onlineEventText);
      smallOnlineEventDiv.append(smallCameraImage, onlineEventText.cloneNode(true));

      eventsDescription.append(onlineEventDiv, smallOnlineEventDiv);
    }

    if (eventElement.attendees) {
      const eventsAttendees = createDomElement({ tag: "p", className: "all-events-attendees", textValue: `${eventElement.attendees} attendees` });
      eventsDescription.append(eventsAttendees);
    }
  });
}

function clearEvents() {
  allEventsDiv.innerHTML = '';
}

function filterEvents(events) {
  const selectedType = eventTypeSelect.value !== "all" ? eventTypeSelect.value : undefined;
  const selectedDistance = eventDistanceSelect.value !== "any" ? eventDistanceSelect.value : undefined;
  const selectedCategory = eventCategorySelect.value !== "any" ? eventCategorySelect.value : undefined;

  let filteredEvents = events;
  if (selectedType) {
    filteredEvents = filteredEvents.filter(event => event.type === selectedType);
  }
  if (selectedDistance) {
    filteredEvents = filteredEvents.filter(event => String(event.distance) === selectedDistance);
  }
  if (selectedCategory) {
    filteredEvents = filteredEvents.filter(event => event.category === selectedCategory);
  }

  clearEvents();
  createEvent(filteredEvents);
}

[eventTypeSelect, eventDistanceSelect, eventCategorySelect].forEach(select => {
  select.addEventListener("change", () => filterEvents(eventsStore));
});

createEvent(eventsStore);
