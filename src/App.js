import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './App.css';
import moment from 'moment';
import Profile from './components/Profile'
import RepositoryList from './components/RepositoryList';

function App() {
  const [name, setName] = useState();
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState();

  const { register, handleSubmit } = useForm();

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
            <Profile user={user} />
          </div>
          <div className="col-md-8">
            <RepositoryList repos={repos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
