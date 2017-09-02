
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home/Home";
import RunnersTable from "./components/RunnersTable/RunnersTable";
import SponsorsTable from "./components/SponsorsTable/SponsorsTable";
import {Link, Route, BrowserRouter as Router,} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import RunnerForm from "./components/RunnerForm/RunnerForm";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import SponsorForm from "./components/SponsorForm/SponsorForm";
import RunnersImport from "./components/RunnersImport/RunnersImport";
import PersonalRunnerForm from "./components/PersonalRunnerForm/PersonalRunnerForm";
import TeamsTable from "./components/TeamsTable/TeamsTable";
import TeamForm from "./components/TeamForm/TeamForm";
import TeamRunnerForm from "./components/TeamRunnerForm/TeamRunnerForm";
import ResultsDashboard from "./components/ResultsDashboard/ResultsDashboard";
import ResultsPersonalRunner from "./components/ResultsPersonalRunner/ResultsPersonalRunner";
import ResultsTeams from "./components/ResultsTeams/ResultsTeams";
import ResultsAllRunner from "./components/ResultsAllRunner/ResultsAllRunner";
import ResultRunner from "./components/ResultRunner/ResultRunner";
import ResultTeam  from "./components/ResultTeam/ResultTeam";
import ResultsSchoolTeams from "./components/ResultsSchoolTeams/ResultsSchoolTeams";
import ResultsFastestRunner from "./components/ResultsFastestRunner/ResultsFastestRunner";
const { Header, Content, Footer, Sider } = Layout;


class App extends Component {
    render() {
        return (
            <div className="App">

                <Router>
                    <Layout>

                        <Header className="header">
                            <Navigation/>
                        </Header>


                        <Content style={{ padding: '0 24px', minHeight: 280, textAlign: 'left' }}>
                            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/results" component={ResultsDashboard}/>
                                <Route exact path="/results/runners" component={ResultsAllRunner}/>
                                <Route exact path="/results/runners/:sort" render={(props) => (
                                    <ResultsAllRunner sort={props.match.params.sort}/>
                                )} />
                                <Route exact path="/results/fastestrunners" render={(props) => (
                                    <ResultsFastestRunner/>
                                )} />

                                <Route exact path="/results/runner/:id" render={(props) => (
                                    <ResultRunner id={props.match.params.id}/>
                                )} />
                                <Route exact path="/results/team/:id" render={(props) => (
                                    <ResultTeam id={props.match.params.id}/>
                                )} />
                                <Route exact path="/results/personal/:minAge/:maxAge" render={(props)=>{

                                    return <ResultsPersonalRunner minAge={parseInt(props.match.params.minAge)} maxAge={parseInt(props.match.params.maxAge)} />
                                }}/>

                                <Route exact path="/results/teams/:min" render={(props)=>{

                                    return <ResultsTeams min={parseInt(props.match.params.min)} />
                                }}/>

                                <Route exact path="/results/teams/:min/:max" render={(props)=>{

                                    return <ResultsTeams min={parseInt(props.match.params.min)} max={parseInt(props.match.params.max)} />
                                }}/>

                                <Route exact path="/results/schoolteams" render={(props)=>{
                                    return <ResultsSchoolTeams />
                                }}/>

                                <Route exact path="/import" component={RunnersImport}/>
                                <Route exact path="/runners" component={RunnersTable}/>
                                <Route exact path="/runners/:id" render={(props) => (
                                    <PersonalRunnerForm personal onCreate={(id)=>{
                                        props.history.push('/runners/'+id)
                                    }} id={props.match.params.id !== 'create' ? props.match.params.id : null}/>
                                )} />
                                <Route exact path="/teamrunners/:id" render={(props) => (
                                    <TeamRunnerForm onCreate={(id)=>{
                                        props.history.push('/teamrunners/'+id)
                                    }} id={props.match.params.id !== 'create' ? props.match.params.id : null}/>
                                )} />
                                <Route exact path="/sponsors" component={SponsorsTable}/>
                                <Route exact path="/sponsors/:id" render={(props) => (
                                    <SponsorForm onCreate={(id)=>{
                                        props.history.push('/sponsors/'+id)
                                    }} id={props.match.params.id !== 'create' ? props.match.params.id : null}/>
                                )}/>
                                <Route exact path="/teams" component={TeamsTable}/>
                                <Route exact path="/teams/:id" render={(props) => (
                                    <TeamForm onCreate={(id)=>{
                                        props.history.push('/teams/'+id)
                                    }} id={props.match.params.id !== 'create' ? props.match.params.id : null}/>
                                )}/>

                            </Layout>

                        </Content>


                    </Layout>


                </Router>
            </div>
        );
    }
}

export default App;
