// import React, { Fragment } from 'react'
// import {Link, NavLink} from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import {connect} from "react-redux";
// import {compose} from 'redux';
// import {logout} from '../../../actions/auth';
// import { withRouter } from "react-router-dom";
//
// // ******* Material UI dependencies **********
// import Divider from '@material-ui/core/Divider';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import {withStyles} from '@material-ui/core/styles';
// import {useTheme} from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import ExitToAppIcon from "mdi-material-ui/ExitToApp";
// // import {getMenuRoutes} from "../../../routes";
//
//
// const drawerWidth = 220;
//
// const styles = (theme) => ({
//   root: {
//     display: 'flex',
//   },
//   drawer: {
//     [theme.breakpoints.up('md')]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//     backgroundColor: theme.palette.primary.main,
//     '& *': {
//       color: '#FFFFFF',
//     },
//   },
//   logo: {
//     height: 64,
//     width: 'auto',
//   },
//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-start',
//   },
//   active: {
//     '& *': {
//       color: theme.palette.secondary.main,
//     }
//   },
// });
//
// const Sidenav = (props) => {
//   const {history, sidenavOpened, toggleSidenav, classes, logout, userInfo} = props;
//   const {t} = useTranslation();
//   const theme = useTheme();
//   const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
//   const menuRoutes = getMenuRoutes(userInfo);
//
//   const drowerProps = {
//     open: !!sidenavOpened,
//     onClose: toggleSidenav,
//     variant: isSmallDevice ? 'temporary' : 'permanent',
//     anchor: isSmallDevice ? 'right' : 'left',
//   };
//
//   return (
//     <nav className={classes.drawer}>
//       <Drawer
//         classes={{paper: classes.drawerPaper}}
//         { ...drowerProps }
//       >
//         <div className={classes.toolbar}>
//           <div className="flex wrap-content justify-center">
//             <Link to="/">
//               <img
//                 className={classes.logo}
//                 src="/images/logo.png"
//                 alt="ISHO_LOGO"
//               />
//             </Link>
//           </div>
//         </div>
//
//         <Divider className="white-divider"/>
//
//         <List>
//           {
//             Object.values(menuRoutes)
//               .map((routeInfo, index) => {
//                 const {
//                   name, routes
//                 } = routeInfo;
//                 return (
//                   <Fragment key={`${name}`}>
//                     { name ? <ListSubheader>{name}</ListSubheader> : null }
//
//                     {
//                       routes && routes.length
//                         ? (
//                           routes.map((route, index) => {
//                             const {
//                               menuUrl,
//                               path,
//                               name,
//                               icon,
//                             } = route;
//                             return (
//                               <ListItem
//                                 button
//                                 key={index}
//                                 component={NavLink}
//                                 to={menuUrl || path}
//                                 activeClassName={classes.active}
//                               >
//                                 <ListItemIcon>
//                                   {icon}
//                                 </ListItemIcon>
//                                 <ListItemText primary={t(name)} />
//                               </ListItem>
//                             );
//                           })
//                         )
//                         : null
//                     }
//                   </Fragment>
//                 );
//
//             })
//           }
//
//           <ListItem button  onClick={()  => logout(history)}>
//             <ListItemIcon>
//               <ExitToAppIcon />
//             </ListItemIcon>
//             <ListItemText primary="Logout" />
//           </ListItem>
//         </List>
//       </Drawer>
//     </nav>
//   );
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     logout: (history) => dispatch(logout(history)),
//   }
// };
//
// export default withRouter(compose(
//   connect(null, mapDispatchToProps),
//   withStyles(styles),
// )(Sidenav));
