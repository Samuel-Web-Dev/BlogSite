import React, { Fragment, useContext } from 'react'
import MainHeader from './main-header'
import NotificationContext from '@/store/notification-context';
import Notifications from '../ui/notification';

const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext)

  const activeNotification = notificationCtx.notification
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notifications title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />
      )}
    </Fragment>
  );
}

export default Layout