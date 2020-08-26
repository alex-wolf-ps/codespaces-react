import React from 'react';
import moment from 'moment';

function Profile(props) {
  var user = props.user;
  
  function formatTime(time)
  {
    var format1 = "MM-DD-YYYY"
    var date1 = new Date(time);
    return moment(date1).format(format1);
  }

  return (
    user ?
      <div className="card">
        <img alt="profile" src={user.avatar_url} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{user.login}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Created: {formatTime(user.created_at)}</li>
          <li className="list-group-item">Company: {user.company}</li>
          <li className="list-group-item">Bio: {user.bio}</li>
          <li className="list-group-item">Location: {user.location}</li>
        </ul>
        <div className="card-body">
          <a href={user.repos_url} target="_blank" rel="noopener noreferrer" className="card-link">Repos</a>
          <a href={user.blog} target="_blank" rel="noopener noreferrer" className="card-link">Blog</a>
        </div>
      </div>
      : null
  );
}

export default Profile ;
