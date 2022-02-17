import Head from "next/head";
import Script from 'next/script'
import Settings from "../core/settings";

interface HeaderData {
    title?: string
}

const Header = (props: HeaderData) => {

    const getTitle = (): string => {
        let title = Settings.APP_NAME
        
        if(props.title)
            title = `${props.title} - ${title}`

        if(Settings.isDevelopment())
            title = `DEV - ${title}`

        return title
    }

    const renderAnalytics = () => {

        const analytics = (
            <>
                <Script strategy={'afterInteractive'} async src={'https://www.googletagmanager.com/gtag/js?id=G-K7MKT332XK'}></Script>
                <Script
                    id={'analyticsTag'}
                    strategy={'afterInteractive'}
                    dangerouslySetInnerHTML={{
                         __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-K7MKT332XK');
                        `
                     }}
                />
            </>
        );

        return (Settings.isDevelopment()) ? analytics : null
        
    }

    return(
        <Head>
            <title>{getTitle()}</title>
            {renderAnalytics()}
            <meta name="description" content={Settings.APP_NAME} />
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:title" content="Web Forest - Floresta Virtual"/>
            <meta property="og:site_name" content={Settings.APP_NAME}/>
            <meta property="og:url" content={Settings.APP_URL}/>
            <meta property="og:description" content="Web Forest - Uma floresta virtual que transforma ações digitais em impactos reais"/>
            <meta property="og:type" content="website"/>
            <meta property="og:image" content="/images/open-graph.png"/>
        </Head>
    )

}

export default Header