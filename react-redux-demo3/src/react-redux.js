import React,{Component} from 'react';
import PropTypes from 'prop-types';

export const connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) =>{
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor () {
      super()
      this.state = {allProps:{}}
    }

    componentWillMount () {
      const { store } = this.context;
      this._updateProps();
      store.subscribe(() => this._updateProps())
    }
    _updateProps () {
      const { store } = this.context
      // let stateProps = mapStateToProps(store.getState(),this.props)  // 额外传入 props,让获取数据更加灵活方便
      // this.getState({
      //   ...stateProps,
      //   ...this.props
      // })
      let stateProps = mapStateToProps 
        ? mapStateToProps(store.getState(),this.props)
        : {} // 防止 mapStateToProps 没有传入
      let dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch,this.props)
        : {} // 防止 mapDispatchToProps 没有传入
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }

    // TODO: 如何从 store 取数据？
    render () {
      // const {store} = this.context;
      // let stateProps = mapStateToProps(store.getState())
      // {...stateProps} 意思是把从 store 里面所需要的属性拿出来全部通过 'props' 方式传递进去
      return <WrappedComponent {...this.state.allProps} />
    }
  }
  return Connect
}

export class Provider extends Component{
  static PropTypes = {
    store:PropTypes.object,
    chidren:PropTypes.any
  }

  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext () {
    return {
      store:this.props.store
    }
  }

  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}