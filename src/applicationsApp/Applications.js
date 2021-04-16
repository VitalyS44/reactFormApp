import React from 'react';

class Applications extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="appli">
        <h2>Ранее поданные заявки</h2>
        <div className="appli-container">
          <p>текст заявки</p>
          <p>Населенный пункт</p>
          <p>Выбранная группа</p>
        </div>
      </div>
    )
  }
}

export default Applications;