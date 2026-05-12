const links = ["home.html", "about.html", "profile.html", "help.html"]
const navBar = `<nav>
            <div class="logo">My Logo</div>
            <ul>
                <li><a ${window.location.pathname === '/home.html' ? 'class="active"' : ''} href="${links[0]}">Home</a></li>
                <li><a ${window.location.pathname === '/about.html' ? 'class="active"' : ''} href="${links[1]}">About</a></li>
                <li><a ${window.location.pathname === '/profile.html' ? 'class="active"' : ''} href="${links[2]}">Profile</a></li>
                <li><a ${window.location.pathname === '/help.html' ? 'class="active"' : ''} href="${links[3]}">Help</a></li>
            </ul>
        </nav>`

const header = document.querySelector('header')
header.innerHTML = navBar