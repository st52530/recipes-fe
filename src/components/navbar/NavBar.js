import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import {Link, withRouter} from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {ReactComponent as Logo} from '../../images/logo.svg';
import {getCurrentUser} from "../../services/AuthenticationService";

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    logo: {
        marginRight: theme.spacing(2),
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: `100%`
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
    titleBox: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    navigationMargin: {
        flexGrow: 1
    },
    navItemMargin: {
        marginRight: theme.spacing(1.5),
    }
}));

const NavBar = ({location, history}) => {
    const navigationItems = [
        {
            name: "Vyhledávání",
            link: "/search"
        },
        {
            name: "Seznam receptů",
            link: "/",
            mobileOnly: true
        },
        {
            name: "Přidat recept",
            link: "/add"
        },
        {
            name: "Odhlásit",
            link: "/logout"
        }
    ]
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const currentUser = getCurrentUser()
    if (currentUser === null) {
        return null
    }

    const drawer = (
        <div>
            <List>
                {navigationItems.map((item, index) => (
                    <ListItem button key={item.name} onClick={() => {
                        handleDrawerToggle()
                        history.push(item.link)
                    }}>
                        <ListItemText primary={item.name}/>
                    </ListItem>
                ))}
            </List>
        </div>
    )
    const desktop = (
        <div>
            <List>
                {navigationItems.filter((item) => !item.mobileOnly)
                    .map((item, index) => (
                        <Button color="inherit" key={item.name} component={Link}
                                to={item.link} className={classes.navItemMargin}>{item.name}</Button>
                    ))}
            </List>
        </div>
    )

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}>
                        <MenuIcon/>
                    </IconButton>
                    <Box display="flex" justifyContent="center" onClick={() => history.push("/")}
                         className={classes.titleBox}>
                        <Logo className={classes.logo}/>

                        <Typography variant="h6" noWrap>
                            Rodinné recepty
                        </Typography>
                    </Box>
                    <div className={classes.navigationMargin}>
                        {/*    Empty div to push navigation right. */}
                    </div>
                    <Hidden xsDown>
                        <nav>
                            {desktop}
                        </nav>
                    </Hidden>
                </Toolbar>
            </AppBar>

            <Hidden smUp>
                <nav>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}>
                        <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                            <CloseIcon/>
                        </IconButton>
                        {drawer}
                    </Drawer>
                </nav>
            </Hidden>
        </>
    );
}

export default withRouter(NavBar)