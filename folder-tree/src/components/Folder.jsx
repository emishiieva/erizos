import React, { Component } from 'react';

class Folder extends Component {
	constructor(props) {
			super(props);
			this.state = {
					collapsed: !props.expanded,
			};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
			if (nextProps.expanded !== prevState.expanded) {
					return {
							collapsed: !nextProps.expanded,
					};
			}
			return null;
	}

	toggleCollapse = () => {
			this.setState((prevState) => ({
					collapsed: !prevState.collapsed,
			}));
	};

	render() {
			const { collapsed } = this.state;
			const { name, children } = this.props;
			return (
					<div>
							<div onClick={this.toggleCollapse} style={{ cursor: 'pointer' }}>
									{collapsed ? '+ \u{1F4C2}' : '- \u{1F4C1}'} {name}
							</div>
							{!collapsed && <div style={{ marginLeft: '20px' }}>{children}</div>}
					</div>
			);
	}
}

export default Folder;
