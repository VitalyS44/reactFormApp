import React from 'react';

class Applications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      perPage: 4,
      current: 0
    }
  }

  render() {
    const { requests } = this.props
    const { perPage, current } = this.state
    const buttons = Math.ceil(requests.length / perPage)
    const toShow = requests.slice(current * perPage, (current + 1) * perPage)
    return (
      <>
        <h2>Ранее поданные заявки</h2>
        <div className="applications" >
          <div className="pagination">
            {[...new Array(buttons).keys()].map(i => {
              return <button onClick={() => this.setState({ current: i })}>{i + 1}</button>
            })}
          </div>
          <div className="requests">
            {toShow.map(req => {
              return (
                <div className="appli-container">
                  <div className="wrapper">
                    <p className="name">Текст обращения</p>
                    <p>{req.value}</p>
                  </div>
                  <div className="wrapper">
                    <p className="name">Регион</p>
                    <p>{req.city.name}</p>
                  </div>
                  <div className="wrapper">
                    <p className="name">Выбраная группа</p>
                    <p>{req.group.name}</p>
                  </div>
                  <div className="wrapper">
                    <p className="name">Выбранный тип</p>
                    <p>{req.type}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div >
      </>
    )
  }
}

export default Applications;