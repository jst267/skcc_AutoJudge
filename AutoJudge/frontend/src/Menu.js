const Menu = [
    {
        heading: 'Main Navigation',
        translate: 'sidebar.heading.HEADER'
    },
    {
        name: 'Single View',
        path: 'singleview',
        icon : 'icon-grid',
        translate: 'sidebar.nav.DASHBOARD'
    },
    {
        name: 'Menu',
        icon: 'icon-speedometer',
        translate: 'sidebar.nav.MENU',
        //label: { value: 1, color: 'info' },알람 붙여주는 표시
        submenu: [{
            name: 'Submenu',
            translate: 'sidebar.nav.menu.SCENARIOSEARCH',
            path: 'submenu'
        }]
    }
];

export default Menu;
