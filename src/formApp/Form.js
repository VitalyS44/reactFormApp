import React from 'react';
import './index.css';
// import ReactDOM from 'react-dom';
// import citys from './city.json';
import groups from './group.json';
import types from './type.json';


class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      citys: [],
      value: '',
      idCity: '',
      city: '',
      group: '',
      type: '',
    };

    // this.getSity = this.getSity.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleGroup = this.handleGroup.bind(this);
    this.handleType = this.handleType.bind(this);
  }

  handleChange(event) {
    //получаем значения из textarea
    // console.log(this.state.value);
    this.setState({ value: event.target.value });
  }

  handleSubmit() {

  }

  //Получаем город
  handleCity(event) {
    this.setState({ city: event.target.value });
    // this.setState({ idCity: event.target.dataset.id });

  }


  //Получаем группу
  handleGroup(event) {
    // console.log(event.target);
    this.setState({ group: event.target.value });
  }

  //Получаем тип
  handleType(event) {
    console.log(this.state.type);
    this.setState({ type: event.target.value });
  }




  componentDidMount() {

    //Отправляем запрос на получение городов
    fetch('/filters', {
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          citys: data
        })
        console.log(this.state.citys);
      });

  }

  render() {
    return (
      <div className="form">
        <h1>Добро пожаловать, заполните форму!</h1>
        <form className="setForm" onSubmit={this.handleSubmit}>
          <textarea onChange={this.handleChange} value={this.state.value} />
          <select onChange={this.handleCity} value={this.state.city}>
            {
              this.state.citys.map(city => {
                return (
                  <option key={city.id} value={city.name}>{city.name}</option>
                )
              })
            }
          </select>
          <h2>Выберите тип</h2>
          <select onChange={this.handleType} value={this.state.type}>
            {
              types.content.map(type => {
                return (
                  <option key={type.id} data-subject={type.subject.id} value={type.name}>{type.name}</option>
                )
              })
            }
          </select>
          <h2>Выберите группу</h2>
          <select onChange={this.handleGroup} value={this.state.group}>
            {
              groups.content.map(group => {
                return (
                  <option key={group.id} data-id={group.id} value={group.name}>{group.name}</option>
                )
              })
            }
          </select>
          <input type="submit" value="Отправить" />
        </form>
      </div>
    )
  }
}

export default Form;