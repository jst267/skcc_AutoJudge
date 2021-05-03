const Menu = [
    {
        heading: 'Main Navigation',
        translate: 'sidebar.heading.HEADER'
    },
    {
        name: 'DashBoard',
        path: 'singleview',
        icon : 'icon-grid',
        translate: 'sidebar.nav.DASHBOARD'
    },
    {
        name: 'SMenus',
        icon: 'icon-speedometer',
        translate: 'sidebar.nav.Smenu.SCENARIO',
        submenu: [{
            name: 'SSearch',
            translate: 'sidebar.nav.SMenu.SCENARIOSEARCH',
            path: 'ssearch'
        },
        {
            name: 'SPMgmt',
            translate: 'sidebar.nav.SMenu.SCENARIOPOOLMANAGEMENT',
            path: 'spmgmt'
        },
        {
            name: 'Smapping',
            translate: 'sidebar.nav.SMenu.EQPALARMSCENARIOMAPPING',
            path: 'smapping'
        }]
    },
    {
        name: 'AJMenus',
        icon: 'icon-speedometer',
        translate: 'sidebar.nav.AJMenu.AUTOJUDGE',
        submenu: [{
            name: 'AJMntr',
            translate: 'sidebar.nav.AJMenu.AUTOJUDGEMONITORING',
            path: 'ajmntr'
        },
        {
            name: 'AJCerti',
            translate: 'sidebar.nav.AJMenu.JUDGECERTIFICATE',
            path: 'ajcerti'
        }]
    },
    {
        name: 'ADMINMenus',
        icon: 'icon-speedometer',
        translate: 'sidebar.nav.ADMINMenu.ADMINMENU',
        submenu: [{
            name: 'ACTMgmt',
            translate: 'sidebar.nav.ADMINMenu.ACTIVITYMANAGEMENT',
            path: 'actmgmt'
        },
        {
            name: 'SMgmt',
            translate: 'sidebar.nav.ADMINMenu.SCENARIOMANAGEMENT',
            path: 'smgmt'
        },
        {
            name: 'ESMgmt',
            translate: 'sidebar.nav.ADMINMenu.EQPSTATUSMANAGEMENT',
            path: 'esmgmt'
        }]
    }
    // {
    //     name: 'Menu',
    //     icon: 'icon-speedometer',
    //     translate: 'sidebar.nav.MENU',
    //     //label: { value: 1, color: 'info' },알람 붙여주는 표시
    //     submenu: [{
    //         name: 'Submenu',
    //         translate: 'sidebar.nav.menu.SCENARIOSEARCH',
    //         path: 'submenu'
    //     }]
    // }
];

export default Menu;
