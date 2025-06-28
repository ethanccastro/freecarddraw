// static.routeService.ts

export interface StaticPageData {
    title: string;
    content: string;
    lastUpdated?: string;
}

export class StaticRouteService {
    
    getAboutUsData(): StaticPageData {
        return {
            title: "About Us",
            content: `
                <h2>About FreeCardDraw</h2>
                <p>FreeCardDraw is a revolutionary platform dedicated to democratizing access to gift card giveaways. Founded with the belief that everyone deserves equal opportunities to win valuable prizes regardless of their financial situation, we've created a transparent, fair, and accessible system that connects generous sponsors with enthusiastic participants worldwide. Our platform has grown from a simple idea into a thriving community of thousands of users who trust us to deliver genuine, no-cost opportunities to win gift cards from their favorite brands and platforms.</p>            
                
                <h3>Our Mission and Vision</h3>
                <p>Our mission extends beyond simply hosting giveaways; we're building a community where generosity meets opportunity. We believe that financial barriers should never prevent someone from enjoying the benefits of gift cards, whether they're for gaming platforms like Roblox and Steam, shopping destinations like Amazon and Walmart, or entertainment services like Netflix and Spotify. By eliminating all costs and purchase requirements, we ensure that our platform truly serves everyone, from students on tight budgets to families looking for extra entertainment options.</p>
                
                <p>Our vision is to become the most trusted and user-friendly platform for free gift card giveaways globally. We're constantly innovating our technology and processes to ensure the fairest possible selection methods, the most transparent winner announcements, and the smoothest user experience. We're committed to maintaining the highest standards of security, privacy, and customer service while expanding our reach to serve even more communities worldwide.</p>
                
                <h3>How Our Platform Works</h3>
                <p>FreeCardDraw operates on a sophisticated yet user-friendly system designed to ensure maximum fairness and transparency. Our platform features an intuitive interface that makes participating in giveaways as simple as possible. Users can browse through our carefully curated selection of active giveaways, each featuring detailed information about the gift card value, brand, and specific terms. Our real-time countdown timers ensure participants always know exactly when each giveaway ends, eliminating any confusion about deadlines.</p>
                
                <p>The entry process is streamlined for maximum accessibility. Participants simply need to provide their username and a valid email address, then confirm their email to complete their entry. Our automated system handles the rest, ensuring that every entry is properly recorded and verified. We use industry-standard random number generation technology to select winners, with all selections being final and binding. Winners are notified immediately via email and their names are publicly announced on our website, maintaining complete transparency throughout the process.</p>
                                
                <h3>Our Core Values and Principles</h3>
                <p>At the heart of FreeCardDraw lies an unwavering commitment to fairness and equality. We believe that every participant, regardless of their background, location, or financial situation, deserves an equal chance to win. Our random selection algorithm ensures that no preference is given to any individual or group, and our transparent winner announcement system allows the community to verify the integrity of each selection. We maintain strict policies against any form of manipulation or unfair advantage, ensuring that our platform remains a level playing field for all participants.</p>
                
                <p>Transparency is not just a value for us - it's a fundamental principle that guides every aspect of our operations. We believe that users have the right to know exactly how our platform works, how winners are selected, and what happens to their information. All winner selections are publicly documented, our terms and conditions are clearly stated, and our privacy policy is easily accessible. We're committed to being open about our processes, policies, and any changes that affect our community.</p>
                
                <p>Accessibility is another cornerstone of our platform. We've designed FreeCardDraw to be usable by people of all technical skill levels, with a clean, intuitive interface that works seamlessly across desktop and mobile devices. Our platform is available in multiple languages, and we're constantly working to improve accessibility features for users with disabilities. We believe that everyone should be able to participate in our giveaways without facing technical barriers or complex requirements.</p>
                
                <p>Community building is perhaps our most cherished value. We're not just hosting giveaways; we're fostering a supportive, engaged community of users who share our vision of accessible opportunities. We encourage positive interactions between participants, celebrate our winners publicly, and maintain active communication channels to address questions and concerns. Our community guidelines promote respect, kindness, and fair play, creating an environment where everyone feels welcome and valued.</p>                
                
                <h3>Our Impact and Future</h3>
                <p>The impact of FreeCardDraw extends far beyond the individual winners we celebrate. We've created a platform that has genuinely changed lives, providing opportunities for people to enjoy experiences they might not otherwise have been able to afford. From students using gaming gift cards to connect with friends online, to families enjoying movie nights with entertainment gift cards, to individuals treating themselves to shopping sprees, our platform has facilitated countless moments of joy and connection.</p>
                
                <p>Looking to the future, we're excited about the opportunities to expand our impact even further. We're constantly exploring new partnerships, developing additional features, and finding ways to serve our community better. Our roadmap includes plans for mobile applications, enhanced social features, expanded international availability, and even more diverse gift card options. We're committed to maintaining the high standards that have made us trusted while continuing to innovate and grow.</p>
                
                <p>We're also proud of our role in promoting digital literacy and online safety. Through our platform, we educate users about safe online practices, help them understand their rights as consumers, and demonstrate the value of legitimate online opportunities. We believe that by providing a positive, secure experience, we're helping to build a more trustworthy and accessible digital landscape for everyone.</p>
                
                <h3>Join Our Community</h3>
                <p>Whether you're a first-time visitor or a returning participant, we welcome you to join our growing community. FreeCardDraw is more than just a giveaway platform - it's a place where opportunities are truly accessible to everyone. We invite you to explore our active giveaways, participate in our community discussions, and experience the difference that genuine fairness and transparency can make.</p>
                
                <p>We're committed to maintaining the trust you place in us and to continuing our mission of providing accessible, fair, and enjoyable opportunities for everyone. Thank you for being part of our community, and we look forward to celebrating many more winners together in the future.</p>
            `,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
    }
    
    getContactUsData(): StaticPageData {
        return {
            title: "Contact Us",
            content: `
                <h2>Contact Information</h2>
                <p>We're here to help! If you have any questions, concerns, or need assistance, please don't hesitate to reach out to us.</p>
                
                <h3>Email Contact</h3>
                <p><strong>General Inquiries:</strong> <a href="mailto:support@freecarddraw.com">support@freecarddraw.com</a></p>                
                
                <h3>Response Time</h3>
                <p>We strive to respond to all inquiries within 24-48 hours during business days. For urgent technical issues, we may respond sooner.</p>
                
                <h3>Before Contacting Us</h3>
                <p>Please check our <a href="/terms">Terms and Conditions</a> and <a href="/about">About Us</a> pages first, as they may answer many common questions.</p>
            `,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
    }
    
    getTermsAndConditionsData(): StaticPageData {
        return {
            title: "Terms and Conditions",
            content: `
                <h2>Terms and Conditions</h2>
                <p>By using FreeCardDraw, you agree to these terms and conditions. Please read them carefully before participating in any giveaway. These terms govern your use of our platform and participation in our gift card giveaways. If you do not agree with any part of these terms, please do not use our service.</p>
                                
                <h3>1. Eligibility</h3>
                <p>To participate in our giveaways, you must meet the following requirements: You must be at least <b>13 years old</b> at the time of entry and provide a <b>valid email address</b> for your entry. Please note that there's a limit of <b>one entry per email address per giveaway</b>. We reserve the right to verify your age and email validity. Employees, contractors, and immediate family members of FreeCardDraw are not eligible to participate. Additionally, participants must be residents of countries where our service is available and comply with all applicable local laws and regulations regarding online giveaways and contests.</p>

                <h3>2. Entry Rules</h3>
                <p>All entries must be <b>submitted before the giveaway end date and time</b> as specified on each giveaway page, and an <b>email confirmation is required</b> to complete your entry. You are permitted to submit <b>multiple entries using different email addresses</b>, provided each email address is valid and unique. All entries must be submitted through our official website form - entries submitted through other means (email, social media, etc.) will not be accepted. You are responsible for ensuring your entry information is accurate and complete. We are not responsible for entries that are lost, delayed, or corrupted due to technical issues beyond our control. Any attempt to manipulate the entry process or use automated systems to submit entries will result in immediate disqualification.</p>

                <h3>3. Winner Selection</h3>
                <p>Winners are chosen <b>randomly</b> using our automated system with a certified random number generator, and all selections are <b>final and binding</b>. If you're a winner, you'll be <b>notified via email within 30 seconds</b> of selection, and your name will be <b>publicly announced on our website</b>. The selection process is conducted fairly and transparently, with no preference given to any participant. Winners have 48 hours to respond to our notification email. If a winner does not respond within this timeframe, we reserve the right to select an alternate winner. Winners may be required to provide additional verification information before receiving their prize. The odds of winning depend on the total number of valid entries received for each specific giveaway.</p>

                <h3>4. Prize Delivery</h3>
                <p>Gift card codes are delivered <b>via email</b> to the address you provided during entry, typically <b>within 24 hours</b> of winner selection. Please understand that FreeCardDraw is <b>not responsible for lost or stolen gift card codes</b>, and all gift cards are <b>subject to the terms of the issuing company</b>. Once a gift card code is delivered to your email, it becomes your responsibility to keep it secure. We cannot replace lost, stolen, or expired gift card codes. All gift cards are subject to the terms and conditions set by the issuing company, including expiration dates, usage restrictions, and geographic limitations. Some gift cards may have specific redemption instructions or limitations that are beyond our control. We recommend redeeming your gift card codes promptly upon receipt to avoid any potential issues with expiration or technical problems.</p>

                <h3>5. Privacy</h3>
                <p>We only collect the information necessary to run our giveaways and contact winners, including your email address and username. Your information <b>will not be shared with third parties</b> and is used <b>solely for giveaway purposes</b>. We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Your email address may be used to send you notifications about new giveaways, winner announcements, and important platform updates. You can opt out of these communications at any time by following the unsubscribe link in our emails. We may retain your information for a reasonable period to comply with legal obligations, resolve disputes, and enforce our agreements. For more detailed information about how we handle your data, please refer to our Privacy Policy.</p>

                <h3>6. Disclaimers</h3>
                <p>FreeCardDraw is provided "as is" without any warranties, express or implied. We are <b>not responsible for technical issues</b> beyond our control, including but not limited to server downtime, network connectivity problems, or software malfunctions, and giveaways may be <b>modified or canceled at any time</b> due to such issues. We also <b>reserve the right to disqualify participants</b> for any rule violations, suspicious activity, or attempts to manipulate the system. We make no guarantees regarding the availability, quality, or value of any gift cards offered in our giveaways. The value of gift cards may fluctuate, and we are not responsible for any changes in gift card terms, conditions, or availability after the giveaway has ended. We reserve the right to substitute prizes of equal or greater value if the original prize becomes unavailable. Our liability is limited to the maximum extent permitted by applicable law.</p>
                
                <h3>7. Changes to Terms</h3>
                <p>We may update these terms at any time to reflect changes in our services, legal requirements, or business practices. Continued use of the platform constitutes acceptance of new terms. We will notify users of significant changes through our website or email communications. It is your responsibility to review these terms periodically to stay informed about any updates. If you continue to use our service after changes are posted, you are agreeing to be bound by the updated terms. If you do not agree with any changes, you should discontinue using our platform immediately.</p>
                
                <h3>8. Contact</h3>
                <p>For questions about these terms, technical support, or general inquiries about our platform, please contact us at <a href="mailto:support@freecarddraw.com">support@freecarddraw.com</a>. We strive to respond to all inquiries within 24-48 hours during business days. Before contacting us, please check our FAQ section and other help resources, as they may answer many common questions. For urgent matters or suspected violations of these terms, please include relevant details and any supporting information to help us assist you more effectively.</p>
            `,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
    }
    
    getSitemapData(): StaticPageData {
        return {
            title: "Sitemap",
            content: `
                <h2>Site Map</h2>
                <p>Navigate our website easily with this comprehensive sitemap.</p>
                
                <h3>Main Pages</h3>
                <ul>
                    <li><a href="/">Home</a> - Browse active giveaways and recent winners</li>
                    <li><a href="/closed">Closed Giveaways</a> - View completed giveaways and winners</li>
                    <li><a href="/about">About Us</a> - Learn about our mission and values</li>
                    <li><a href="/contact">Contact Us</a> - Get in touch with our support team</li>
                    <li><a href="/terms">Terms and Conditions</a> - Read our terms of service</li>
                    <li><a href="/sitemap">Sitemap</a> - This page</li>
                </ul>
                
                <h3>Category Pages</h3>
                <p>Browse giveaways by category:</p>
                <ul>
                    <li><a href="/category/roblox">Roblox Gift Cards</a></li>
                </ul>
                
                <h3>Individual Giveaway Pages</h3>
                <p>Each active giveaway has its own dedicated page where you can:</p>
                <ul>
                    <li>View detailed information about the gift card</li>
                    <li>See the current countdown timer</li>
                    <li>Enter the giveaway with your information</li>
                    <li>View entry requirements and rules</li>
                </ul>
                
                <h3>How to Navigate</h3>
                <ul>
                    <li><strong>Homepage:</strong> Start here to see all active giveaways</li>
                    <li><strong>Categories:</strong> Use the sidebar to filter by gift card type</li>
                    <li><strong>Search:</strong> Look for specific gift cards or values</li>
                    <li><strong>Mobile:</strong> Use the hamburger menu for mobile navigation</li>
                </ul>
                
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/">Most Recent Giveaways</a></li>
                    <li><a href="/closed">Recently Closed Giveaways</a></li>
                    <li><a href="/contact">Need Help? Contact Us</a></li>
                    <li><a href="/terms">Read Our Terms</a></li>
                </ul>
            `,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
    }
} 