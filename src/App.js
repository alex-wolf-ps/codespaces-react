import React, { useState, useEffect, useReducer } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';

function App() {
  const [name, setName] = useState();
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState();

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = data => {
    setName(data.example);
  };

  


  useEffect(() => {
    if (name) {
      axios.get(`https://api.github.com/users/${name}/repos`)
        .then(res => {
          setRepos(res.data);
        })

      axios.get(`https://api.github.com/users/${name}`)
        .then(res => {
          setUser(res.data);
        })
    }
  }, [name]);

  function formatTime(time)
  {
    var format1 = "MM-DD-YYYY"
    var date1 = new Date(time);
    return moment(date1).format(format1);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <header>
            <div class="jumbotron">
              <h1 class="display-4">Hello!</h1>
              <p class="lead">This is a simple github user search tool.  Just type in a profile username and hit enter!</p>
              <hr class="my-4" />
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div class="form-group">
                <input name="example" className="form-control" ref={register} />
                </div>
                <input type="submit" className="btn btn-primary" value="Search Now" />
              </form>
            </div>
          </header>
        </div>
        <div className="row">
          <div className="col-md-4">
            {user ?
              <div className="card">
                <img src={user.avatar_url} className="card-img-top" />
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
                  <a href={user.repos_url} target="_blank" className="card-link">Repos</a>
                  <a href={user.blog} target="_blank" className="card-link">Blog</a>
                </div>
              </div>
              : null}
          </div>
          <div className="col-md-8">
            {repos.length > 0 && repos.map((repo) =>
              <div className="card repo-card">
                <div class="card-body">
                  <h5 className="card-title">{repo.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Created: {formatTime(repo.created_at)}</h6>
                  <p className="card-text">{repo.description}</p>
                  <a href={repo.html_url} target="_blank"  className="card-link">View Repository</a>
                </div>
              </div>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
