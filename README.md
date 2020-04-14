# EventOur

### What is it? 

The basic goal of the project is to demonstrate skills acquired during the *"**VueJS - March 2020**"* training. To cover the practical part of the exam ending with the project defense.

### What does it do?

From the user's point of view. It is a simple platform for creating, sharing and joining events. It can be used to create an event and share it to someone. registered users also can join events organized by others.

### Basic functionality

**Guest user** can explore the Events and review their details. He also can share the events to his social networks. To do more he must be registered.

The registration process require the following mandatory data to be provided:

*  ***Name*** - The username to be displayed when user is entered. 
*  ***Email*** - The email is used by app to identify the user during the login procedure.
*  ***Photo*** - The image uploaded by user for his avatar.
*  ***Password*** - Six characters minimum.

After successful registration, the user automatically logs in.

**Registered user** 

* Can ***create*** Events
* Can ***modify*** the Events he created
* Can ***join*** Events created by others
* Can ***filter*** Events in order to see only the Events he joined
* Can ***left*** already joined Events

To create an Event, the user have to provide the following data:

* ***Title*** - mandatory. The Event title - is shown in landing page carousel, Event list and Event details pages.
* ***Location*** - mandatory. Plain text location. Map locations (coordinates) will be supported in the next release. Location is shown in Event list and Event details pages. 
* ***Start time*** - mandatory. The scheduled time when the event should start. Visible on the Events list and Event details pages.
* ***End time*** - optional. The estimated time when the event should end. Only visible on the Event details page.
* ***Event image*** - mandatory. An image presenting the Event. Should be uploaded from the file system. It is visible on the landing page, if the Event is in the five most recent starting events, and in the Events list and Event details pages as well. 
* ***Description*** - mandatory. Some useful description, explaining the happening.

The project preview of work-in-progress is available here: 
[http://www.orbital.bg/eventour](http://www.orbital.bg/eventour "EventOur")  



### Technology used

The project is a SPA based on [VueJS v2](https://vuejs.org/v2/guide/) framework. In addition the following modules are in use:

* **firebase - 7.13.2** - to facilitate communication with the [firebase database](https://firebase.google.com/), and user authentication.
* **moment - 2.24.0** - to facilitate working with times and dates.
* **vue-ctk-date-time-picker - 2.4.0** - a nice component to pick the date and time up.
* **vue-router - 3.1.6** - to navigate upon the components.
* **vuetify - 2.2.11** - a Vue UI Library with beautifully handcrafted Material Components.
* **vuex - 3.1.3** -  The Vue state management library to arrange a centralized store for all components in the application, and manage its state mutations properly.

### Entities managed

The application utilizes the firebase *Authentication* mechanism to manage the users, and the **User** entity looks like this:

```javascript
{
	uid: "ObOzN2rM6BccNqW6g7QkgecRAx23",
	displayName: "Tsvetan Raykov",
	photoURL: "https://firebasestorage.googleapis.com/v0/b/evento…=media&token=bf59440a-55eb-44d9-b0a0-820786976d0a",
	email: "tsvetan.raykov@gmail.com",
	phoneNumber: null,
	 …
}
```

To store the Events application user the firebase *Realtime Database*. The model of an **Event** entity is shown below:

![](https://firebasestorage.googleapis.com/v0/b/eventour-63336.appspot.com/o/events%2F2020-04-14_22-43-14.png?alt=media&token=ea0112a4-b1a4-417a-af48-b10c0383b280)

The app also uses an additional collection ../***joined***/.. to store event IDs for which the user is subscribed to.

The firebase *File Storage* is used by the application as well to upload the Events images and User photos (avatars)  and to link their URLs inside the components. 

![](https://firebasestorage.googleapis.com/v0/b/eventour-63336.appspot.com/o/events%2F2020-04-14_23-06-38.png?alt=media&token=3a165881-651d-40c9-8d8b-9b49856b04d2)



The EventOur application also offer a simple and responsive UI/UX, to facilitate its usage on mobile devices:

<img src="http://www.orbital.bg/eventour/2020-04-15_00-43-50.gif" style="zoom: 50%;" />



