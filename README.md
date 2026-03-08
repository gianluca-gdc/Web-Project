# Web-Project
html/css/javascript web project
This web project is a spin on tinder but for networking and finding students that have the same interests or courses as you.
Users should have the ability to login, then create a quick profile with a picture upload and text boxes for entering interests, courses, etc, then
Another page for displaying common people, and ultimately a match page.
Solves the age old problem of human connection- creating connections- perhaps re-connect is a cool play on words name for the project
The intended user is anyone thats lonely and has access to a device, preferably college students
Sign up, create profile, swipe on individual profiles, and connect.

<img width="1503" height="559" alt="Screenshot 2026-03-08 at 4 07 54 PM" src="https://github.com/user-attachments/assets/ad0803fd-53ab-4dd3-8cb2-7a8fa7679e18" />
ERD Business Rules:
USER ↔ USERPROFILE
A User must have one and only one UserProfile.
A UserProfile must belong to one and only one User.

USERPROFILE ↔ PHOTO
A UserProfile may have one or many Photos.
A Photo must belong to one and only one UserProfile.

USER ↔ SWIPE (as swiper)
A User may make one or many Swipes.
A Swipe must be made by one and only one User (swiper).

USER ↔ SWIPE (as target)
A User may receive one or many Swipes.
A Swipe must target one and only one User (target).

USER ↔ MATCH (as user_a)
A User may be involved in one or many Matches as user_a.
A Match must have one and only one User as user_a.

USER ↔ MATCH (as user_b)
A User may be involved in one or many Matches as user_b.
A Match must have one and only one User as user_b.

MATCH ↔ MESSAGETHREAD
A Match may have one and only one MessageThread.
A MessageThread must belong to one and only one Match.

MESSAGETHREAD ↔ MESSAGE
A MessageThread may have one or many Messages.
A Message must belong to one and only one MessageThread.

USER ↔ MESSAGE (as sender)
A User may send one or many Messages.
A Message must be sent by one and only one User (sender).
