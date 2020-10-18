import * as React from 'react';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';

interface IProps {}
interface IState {
  emails: string[];
}
class Basic extends React.Component<IProps, IState> {
  state = {
    emails: this.props.emails,
  };

  render() {
    const { emails } = this.state;
    return (
      <>
          <h3>Add contacts</h3>
          <ReactMultiEmail
            placeholder="Input your email"
            emails={emails}
            onChange={(_emails: string[]) => {
              this.setState({ emails: _emails });
              this.props.onTitleChange(_emails)
            }}
            getLabel={(
              email: string,
              index: number,
              removeEmail: (index: number) => void,
            ) => {
              return (
                <div data-tag key={index}>
                  <div data-tag-item>
                    {email}
                  </div>
                  <span data-tag-handle onClick={() => removeEmail(index)}>
                    ×
                  </span>
                </div>
              );
            }}
          />
          <br />
      </>
    );
  }
}

export default Basic;