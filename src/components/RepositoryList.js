import React from 'react';
import moment from 'moment';

function RepositoryList(props) {
  var repos = props.repos;
  
  function formatTime(time)
  {
    var format1 = "MM-DD-YYYY"
    var date1 = new Date(time);
    return moment(date1).format(format1);
  }

  return (
    repos.length > 0 && repos.map((repo) =>
      <div className="card repo-card">
        <div class="card-body">
          <h5 className="card-title">{repo.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Created: {formatTime(repo.created_at)}</h6>
          <p className="card-text">{repo.description}</p>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="card-link">View Repository</a>
        </div>
      </div>
    )
  );
}

export default RepositoryList ;
