import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* loader component for Suspense*/
import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
// import BaseHorizontal from './components/Layout/BaseHorizontal';

/* Used to render a lazy component with react-router */
const waitFor = Tag => props => <Tag {...props}/>;

const SingleView = lazy(() => import('./components/SingleView/SingleView'));
// const SubMenu = lazy(() => import('./components/SubMenu/SubMenu'));

const ACTMgmt = lazy(() => import('./components/ADMINMenus/ACTMgmt'));
const ESMgmt = lazy(() => import('./components/ADMINMenus/ESMgmt'));
const SMgmt = lazy(() => import('./components/ADMINMenus/SMgmt'));
const AJmntr = lazy(() => import('./components/AJMenus/AJMntr'));
const AJCerti = lazy(() => import('./components/AJMenus/AJCerti'));
const SMapping = lazy(() => import('./components/SMenus/SMapping'));
const SPMgmt = lazy(() => import('./components/SMenus/SPMgmt'));
const SSearch = lazy(() => import('./components/SMenus/SSearch'));


// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages = [
    /* See full project for reference */
];

const Routes = ({ location }) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 500 };

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'

    const animationName = 'rag-fadeIn'

    if(listofPages.indexOf(location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Suspense fallback={<PageLoader/>}>
                    <Switch location={location}>
                        {/* See full project for reference */}
                    </Switch>
                </Suspense>
            </BasePage>
        )
    }
    else {
        return (
            // Layout component wrapper
            // Use <BaseHorizontal> to change layout
            <Base>
              <TransitionGroup>
                <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                    <div>
                        <Suspense fallback={<PageLoader/>}>
                            <Switch location={location}>
                                <Route path="/singleview" component={waitFor(SingleView)}/>
                                <Route path="/actmgmt" component={waitFor(ACTMgmt)}/>
                                <Route path="/esmgmt" component={waitFor(ESMgmt)}/>
                                <Route path="/smgmt" component={waitFor(SMgmt)}/>
                                <Route path="/ajmntr" component={waitFor(AJmntr)}/>
                                <Route path="/ajcerti" component={waitFor(AJCerti)}/>
                                <Route path="/smapping" component={waitFor(SMapping)}/>
                                <Route path="/spmgmt" component={waitFor(SPMgmt)}/>
                                <Route path="/ssearch" component={waitFor(SSearch)}/>
                                <Redirect to="/singleview"/>
                            </Switch>
                        </Suspense>
                    </div>
                </CSSTransition>
              </TransitionGroup>
            </Base>
        )
    }
}

export default withRouter(Routes);
