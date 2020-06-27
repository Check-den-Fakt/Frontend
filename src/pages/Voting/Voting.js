import React, { Component } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import fetchAPI from '../../utils/fetchAPI';
import authentication from 'react-azure-adb2c'
import { withTranslation } from 'react-i18next';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

window.id = 0;

class Voting extends Component {

  state = {
    sources: [],
    news: {},
    tempSource: '',
    isLoading: false,
    offset: 0,
  };

  handleSubmit = async (status) => {
    const adb2cToken = authentication.getAccessToken();
    const { news } = this.state;
    const type = status ? 'Up' : 'Down';
    const body = {
      id: news.id,
      DateTime: news.DateTime,
    };
    news.Voting = news.Voting + status ? 1 : -1;
    this.setState({ isLoading: true });
    try {
      await fetchAPI.postData(`https://apim-checkdenfakt-prod-we-001.azure-api.net/fakenewsmod/Vote${type}`, body, adb2cToken)
    } catch (e) {
      this.setState({isLoading: false })
    } finally {
      this.setState({isLoading: false });
      this.getNews();
    }
  };

  getNews = async () => {
    const {offset} = this.state;
    this.setState({isLoading: true});
    const adb2cToken = authentication.getAccessToken();
    const query = offset === 0 ? 'GetOne' : `GetNext?offset=${offset}`;
    let response = null;
    try{
      response = await fetchAPI.getData(`https://apim-checkdenfakt-prod-we-001.azure-api.net/fakenewsmod/${query}`, adb2cToken)
    }
    catch (e) {
      this.setState({isLoading: false })
    } finally {
      this.setState({isLoading: false, news: response, offset: offset + 1});
    }
  };

  componentDidMount() {
    this.getNews();
  }
  render () {
    const { t } = this.props;

    const { news, isLoading } = this.state;
    // Declare a new state variable, which we'll call "count"
    return (
    <div className="mt-5">
      <div className="text-center">
    <h1 className="display-4">{t("SupportCommunity")}</h1>
    <p className="lead">{t("WeCouldUseAHand")}</p>
      </div>
     
      <div className="d-flex justify-content-center mt-n3">
        <div className="polygon background-color-1">
    <h3 className="text-center py-2">{t("HowDoYouAssess")}</h3>
       <Form className="container">
        <Form.Group controlId="exampleForm.ControlTextarea1">

          <Form.Control
              disabled
            as="textarea" 
            rows="6"
            value={ (!!news && news.Content) || t("ThereAreNoMore") }
          />
        </Form.Group>
        {isLoading ? <Spinner animation="border" /> :
            <div className="center mt-5">
 
              <div className="d-flex justify-content-between">
              <Button
                    className="vote-btn-text"
                    disabled={!news}
                    onClick={() => this.handleSubmit(false)}
                    variant="link"
                >
                  <ThumbDownIcon className="material-icons vote-btn red"/>
                  <p><b>Fake</b></p>
                </Button>

                <Button
                    className="vote-btn-text"
                    variant="link"                
                    disabled={!news}
                    onClick={() => this.handleSubmit(true)}
                >
                  <ThumbUpIcon className="material-icons vote-btn green"/>
                  <p><b>{t("true")}</b></p>
                </Button>
              </div>

              <div className="d-flex justify-content-center">
                <Button
                
                    disabled={!news}
                    onClick={this.getNews}
                    variant="light"
                >
                  <b>{t("skip")}</b>
                </Button>
              </div>
            </div>}
      </Form>
      
    </div>
    </div>
    <div className="text-center ">
    <p>{t("SomeTips")}</p>
    <div className="d-flex justify-content-center">
    <Button className="py-2" variant="primary" href="/rules"><b>{t("HowDoI")}</b></Button>
    </div>
    </div>
        </div>
    );
  }
}

export default withTranslation()(Voting);
