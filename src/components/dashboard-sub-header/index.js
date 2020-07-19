import React, {Component} from 'react';

import './index.scss';

class DashboardSubHeader extends Component {
  constructor() {
    super()
    this.showMyTaskToggle = false;
  }

    render() {
        return (
          <div className="dashboard_sub_header">
          <div>
            <span>6 people</span>
            <span>2 days left</span>
          </div>
          <div>
            <span>Show my task only</span>
            <span>
              <label className="switch">
                <input type="checkbox" checked={this.showMyTaskToggle}  onChange={() => {
                    this.showMyTaskToggle = !this.showMyTaskToggle
                    this.props.showMyTaskOnlyProps(this.showMyTaskToggle)
                }}/>
                <span className="slider round"></span>
              </label>
            </span>
          </div>
        </div>
        );
    }
}

export default DashboardSubHeader;
