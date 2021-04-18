import React from 'react';
import './index.css';
import types from './type.json';
import storageWorker from './../storageWorker';
import MapView from './../mapApp/MapView';
import Applications from './../applicationsApp/Applications';


class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      requests: [],
      citys: [],
      groups: [],
      value: '',
      city: null,
      group: null,
      type: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleGroup = this.handleGroup.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //получаем значения из textarea
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      requests: [...state.requests, {
        city: this.state.city,
        value: this.state.value,
        group: this.state.group,
        type: this.state.type
      }]
    }))
    const requests = storageWorker.getRequests();
    storageWorker.saveRequests([...requests, {
      city: this.state.city,
      value: this.state.value,
      group: this.state.group,
      type: this.state.type
    }])

    //Чистим textarea
    this.setState({ value: '' });
  }

  //Получаем город
  handleCity(event) {
    this.setState({ city: event.target.value });
    const selectedCity = this.state.citys.find(city => city.name === event.target.value);
    this.setState({ city: selectedCity })
  }


  //Получаем группу
  handleGroup(event) {
    const selectedGroup = this.state.groups.find(group => group.name === event.target.value);
    this.setState({ group: selectedGroup });

  }

  //Получаем тип
  handleType(event) {
    this.setState({ type: event.target.value });
  }

  componentDidMount() {
    //Отправляем запрос на получение городов
    this.setState({ requests: storageWorker.getRequests() })
    fetch('/filters', {
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          citys: data
        }, () => {
          this.setState({ city: this.state.citys[0] })
        })
      });

    fetch('/inbox-service/subjects', {
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          groups: data.content
        }, () => {
          this.setState({ group: this.state.groups[0] })
        })
      });
  }

  // componentDidUpdate(_, state) {
  // Отправляем запрос на получение типа (запрос возвращается пустым)
  //   if (state.city && state.group) {
  //     fetch(`/inbox-service/subsubjects/subject/${state.group.id}/region/${state.city.id}`)
  //   }
  // }

  render() {
    return (
      <>
        <div className="form">
          <h1>Добро пожаловать, заполните форму!</h1>
          <form className="setForm" onSubmit={this.handleSubmit}>
            <textarea onChange={this.handleChange} value={this.state.value} />
            <h2>Выберите регион</h2>
            <select onChange={this.handleCity}>
              {
                this.state.citys.map(city => {
                  return (
                    <option key={city.id} value={city.name}>{city.name}</option>
                  )
                })
              }
            </select>
            <h2>Выберите группу</h2>
            <select onChange={this.handleGroup} >
              {
                this.state.groups.length && this.state.groups.map(group => {
                  return (
                    <option key={group.id} value={group.name}>{group.name}</option>
                  )
                })
              }
            </select>
            <h2>Выберите тип</h2>
            <select onChange={this.handleType} >
              {
                types.content.map(type => {
                  return (
                    <option key={type.id} value={type.name}>{type.name}</option>
                  )
                })
              }
            </select>
            <input type="submit" value="Отправить" />
          </form>
        </div>
        <MapView />
        <Applications requests={this.state.requests} />
      </>
    )
  }
}

export default Form;