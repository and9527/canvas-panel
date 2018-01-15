import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Manifesto from 'manifesto.js';
import LocaleString from '../LocaleString/LocaleString';
import functionOrMapChildren, {FunctionOrMapChildrenType} from '../../utility/functionOrMapChildren';

class CanvasProvider extends Component {

  state = {
    currentCanvas: null,
  };

  static propTypes = {
    sequence: PropTypes.number,
    atCanvas: PropTypes.number,
    manifest: PropTypes.instanceOf(Manifesto).isRequired,
    children: FunctionOrMapChildrenType
  };

  static defaultProps = {
    sequence: 0,
    atCanvas: 0,
  };

  static NEXT_CANVAS = 'NEXT_CANVAS';
  static PREV_CANVAS = 'PREV_CANVAS';

  static reducer(state, action) {
    switch (action.type) {
      case CanvasProvider.NEXT_CANVAS:
        return {...state, currentCanvas: state.currentCanvas + 1};
      case CanvasProvider.PREV_CANVAS:
        return {...state, currentCanvas: state.currentCanvas === 0 ? 0 : state.currentCanvas - 1};
    }
    return state;
  }

  static nextCanvas() {
    return {type: CanvasProvider.NEXT_CANVAS};
  }

  static prevCanvas() {
    return {type: CanvasProvider.PREV_CANVAS};
  }

  componentWillMount() {
    if (this.props.atCanvas !== this.state.currentCanvas) {
      this.setState({currentCanvas: this.props.atCanvas});
    }
  }

  dispatch = action => {
    this.setState(CanvasProvider.reducer(this.state, action));
  };

  render() {
    const {manifest, atCanvas, children} = this.props;
    const {currentCanvas} = this.state;

    const sequence = manifest.getSequenceByIndex(this.props.sequence);
    const canvas = sequence.getCanvasByIndex(currentCanvas);

    return functionOrMapChildren(children, {
      manifest,
      sequence,
      canvas,
      atCanvas,
      currentCanvas,
      dispatch: this.dispatch,
      width: canvas.getWidth(),
      height: canvas.getHeight(),
    });
  }
}

export default CanvasProvider;