# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh











**Meal Details Page (/meal/:id):**

Fetch meal details based on the id parameter.
Display meal image, admin/meal distributor name, description, ingredients, post time, rating, like button, meal request button, and reviews.
Implement like button functionality (requires login).
Implement meal request button functionality (requires login).
Display reviews and implement review functionality (requires login).
Users can see their own reviews on the dashboard/my reviews page.


**Meals Page (/meals):**

Display all meals.
Implement search functionality based on meal title.
Implement filter-by-category and filter-by-price-range options.


**Checkout Page (/checkout, Private Route):**

Display package details.
Implement Stripe payment method.
After successful payment, show a modal confirming the purchase.
Assign a badge based on the purchased package.
User Dashboard (/dashboard, Private Route):

Display user routes: My Profile, Requested Meals, My Reviews.


**My Profile Page (/dashboard/my-profile):**

Display user's name, image, email, and badges.
Display Bronze Badge if the user is registered.
Display Gold Badge if the user purchased a premium package.


**Requested Meals Page (/dashboard/requested-meals):**

Display meals requested/ordered by the user.
Show meal title, likes count, reviews count, status (pending/delivered), cancel button.
Sort data based on status before showing on the UI.


**My Reviews Page (/dashboard/my-reviews):**

Display reviews given by the user.
Show meal title, likes count, reviews count, edit button, delete button, view meal button.
Handle review update and deletion.




**Manage Users Page (/admin-dashboard/manage-users):**

Show all users in a tabular form.
Display user name, user email, make admin button, subscription status.
Implement making a user admin by clicking the Make Admin button.
Implement server-side search functionality to find a specific user.


**Add Meal Page (/admin-dashboard/add-meal):**

Implement a form with meal details using react-hook-form.
Add meal to the database.
Show a toast/sweet-alert after successfully adding data.
Add meal to the upcoming collection.


**All Meals Page (/admin-dashboard/all-meals):**

Show all meals in tabular form.
Display meal title, likes count, reviews count, distributor name, distributor email, update button, delete button, view meal button.


**All Reviews Page (/admin-dashboard/all-reviews):**

    Show all reviews in tabular form.
    Display meal title, likes count, reviews count, delete button, view meal button.
    Implement sorting based on likes count and reviews count.


**Serve Meals Page (/admin-dashboard/serve-meals):**

Show all requested meals by users in tabular form.
Display meal title, email (who makes request), name (who makes request), status (pending/delivered), serve button.
Implement serving meals by changing the status from pending to delivered.