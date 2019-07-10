// Make sure that the proactive.js file is loaded first.

// your appId
const appId = '5cfaadd937749e0010a8a71c';

// this is script that imports/loads the web sdk into the browser
!function(e,n,t,r){
    function o(){try{
        var e;if((e="string"==typeof this.response?JSON.parse(this.response):this.response).url){var t=n.getElementsByTagName("script")[0],r=n.createElement("script");r.async=!0,r.src=e.url,t.parentNode.insertBefore(r,t)}}catch(e){}}var s,p,a,i=[],c=[];e[t]={init:function(){s=arguments;var e={then:function(n){return c.push({type:"t",next:n}),e},catch:function(n){return c.push({type:"c",next:n}),e}};return e},on:function(){i.push(arguments)},render:function(){p=arguments},destroy:function(){a=arguments}},e.__onWebMessengerHostReady__=function(n){if(delete e.__onWebMessengerHostReady__,e[t]=n,s)for(var r=n.init.apply(n,s),o=0;o<c.length;o++){var u=c[o];r="t"===u.type?r.then(u.next):r.catch(u.next)}p&&n.render.apply(n,p),a&&n.destroy.apply(n,a);for(o=0;o<i.length;o++)n.on.apply(n,i[o])};var u=new XMLHttpRequest;u.addEventListener("load",o),u.open("GET","https://"+r+".webloader.smooch.io/",!0),u.responseType="json",u.send()
}(window,document,"Smooch", appId);

const handleWidgetOpened = (proactiveMessage, appUserId) => {
    fetch("http://localhost:8000/echo-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            appUserId,
            proactiveMessage
        })
    }).then(() => proactiveVisible = false);
}

// this is where we init() the web widget
Smooch.init({ 
    appId
}).then(() => {
    // once the websdk has initialized,
    // we check for a proactive message exists for this page/url
    if (proactiveMessage.id) {
        // We need to verify that there is no cookie. i.e. the user has not already
        // dismissed the message previously.
        const proactiveDismissed = document.cookie.split(';').filter((item) => item.trim().startsWith(proactiveMessage.id)).length;
        // show the message!
        if (!proactiveDismissed) showProactiveMessage();
    }
    Smooch.on('widget:opened', () => {
        // need to "start" the conversation to generate a user.
        Smooch.startConversation()
            .then(() => {
                // We get the appUser. The appUser object is only created once a conversation is started.
                // (we need an appUserId to send the proactive message back to them)
                const appUser = Smooch.getUser();
                if (proactiveVisible) {
                    // send the appUserId and the proactivemessage to our echo "bot"
                    handleWidgetOpened(proactiveMessage, appUser._id);
                    // when the sdk is opened remove the message, if it's visible
                    destroyProactiveMessage();
                }
            });
    });
});