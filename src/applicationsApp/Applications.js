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
      < div className="appli" >
        {[...new Array(buttons).keys()].map(i => {
          return <button onClick={() => this.setState({ current: i })}>{i + 1}</button>
        })}
        <h2>Ранее поданные заявки</h2>
        <div className="requests">
          {toShow.map(req => {
            return (
              <div className="appli-container">
                <p>{req.value}</p>
                <p>{req.city.name}</p>
                <p>{req.group.name}</p>
              </div>
            )
          })}
        </div>
      </div >
    )
  }
}

export default Applications;