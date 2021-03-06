import React, { PureComponent } from 'react';
import * as Manifesto from 'manifesto.js';
import * as PropTypes from 'prop-types';

class LocaleString extends PureComponent {
  render() {
    const { children, renderList, lang } = this.props;
    if (!children) {
      return null;
    }

    if (Array.isArray(children)) {
      return Manifesto.LanguageMap.getValue(children);
    }

    if (children[lang]) {
      return renderList
        ? renderList(children[lang])
        : Manifesto.LanguageMap.getValue(children[lang]);
    }

    const values = Object.values(children);
    if (values.length) {
      return renderList ? (
        renderList(values[0])
      ) : (
        <span dangerouslySetInnerHTML={{ __html: values[0].join('\n') }} />
      );
    }

    return '';
  }
}

export default LocaleString;
