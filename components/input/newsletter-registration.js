import { useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '@/store/notification-context';

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext)
  const emailInputRef = useRef()

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
    // optional: validate input
    if (!enteredEmail.trim()) {
      return;
    }


    // notificationCtx.showNotification({
    //   title: 'Signing up...',
    //   message: 'Registering for newsletter.',
    //   status: 'pending'
    // })
    // send valid data to API

    fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
      }),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
          notificationCtx.showNotification({
            title: "Success!",
            message: "Successfully registered for newsletter",
            status: "success",
          });
        console.log(data);
        
      }).catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong",
          status: "error",
        });
      })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
