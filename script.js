class SupportSite {
    constructor() {
        this.data = {
            categories: [],
            articles: []
        };
        this.currentArticle = null;
        this.currentEditingArticle = null;
        this.quillEditor = null;
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderNavigation();
        this.renderAdminData();
        this.initializeQuillEditor();
        this.updateCategoryDescription(''); // Clear description on init
    }

    loadData() {
        const savedData = localStorage.getItem('doorSupportData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            // Check if we need to update to new structure
            if (!parsedData.categories.some(cat => cat.name === "I'm Living in a Property")) {
                // Old structure detected, reset to new structure
                localStorage.removeItem('doorSupportData');
                this.loadDefaultData();
            } else {
                this.data = parsedData;
            }
        } else {
            this.loadDefaultData();
        }
    }

    loadDefaultData() {
        this.data = {
                categories: [
                    // Main Categories
                    { id: '1', name: 'I\'m Living in a Property', parentId: null, description: 'This section is for people who live in a Door-enabled building and use the app for their own access.' },
                    { id: '2', name: 'I\'m Visiting a Property', parentId: null, description: 'This section is for visitors, friends, or family who have been given temporary access by a resident.' },
                    { id: '3', name: 'I\'m Managing a Property', parentId: null, description: 'This section is for property managers, landlords, or building staff responsible for managing a property.' },
                    { id: '4', name: 'I\'m Installing Devices', parentId: null, description: 'This section is for professional installers, technicians, or skilled staff tasked with the physical installation of Door hardware.' },
                    
                    // Living in a Property Subcategories
                    { id: '5', name: 'Getting Started with the Door App', parentId: '1', description: '' },
                    { id: '6', name: 'Everyday Use', parentId: '1', description: '' },
                    { id: '7', name: 'Sharing Access with Guests', parentId: '1', description: '' },
                    { id: '8', name: 'Smart Home Integration', parentId: '1', description: '' },
                    { id: '9', name: 'Troubleshooting & Support', parentId: '1', description: '' },
                    
                    // Visiting a Property Subcategories
                    { id: '10', name: 'Using Your Temporary Key', parentId: '2', description: '' },
                    { id: '11', name: 'Troubleshooting', parentId: '2', description: '' },
                    
                    // Managing a Property Subcategories
                    { id: '12', name: 'Setting Up Your Property', parentId: '3', description: '' },
                    { id: '13', name: 'Daily Operations', parentId: '3', description: '' },
                    { id: '14', name: 'Advanced Management', parentId: '3', description: '' },
                    { id: '15', name: 'Troubleshooting & Support', parentId: '3', description: '' },
                    
                    // Installing Devices Subcategories
                    { id: '16', name: 'Pre-Installation', parentId: '4', description: '' },
                    { id: '17', name: 'Installation Process', parentId: '4', description: '' },
                    { id: '18', name: 'Post-Installation & Testing', parentId: '4', description: '' },
                    { id: '19', name: 'Troubleshooting', parentId: '4', description: '' }
                ],
                articles: [
                    // Getting Started with the Door App (Category 5)
                    {
                        id: '1',
                        title: 'What is the Door App?',
                        categoryId: '5',
                        content: `<h1>What is the Door App?</h1><p>The Door App is your key to seamless access control in Door-enabled buildings. This comprehensive mobile application transforms your smartphone into a digital key, allowing you to unlock doors, manage access, and control smart home devices with ease.</p><h2>Key Features</h2><ul><li><strong>Digital Key Technology</strong>: Use your phone as a secure digital key</li><li><strong>Guest Access Management</strong>: Share temporary keys with visitors</li><li><strong>Access History</strong>: View your personal door usage history</li><li><strong>Smart Home Integration</strong>: Control connected devices and create automations</li><li><strong>Real-time Notifications</strong>: Stay informed about access events</li></ul><h2>Getting Started</h2><p>Download the Door App from your device's app store and follow the setup process to begin using your digital access solution.</p>`
                    },
                    {
                        id: '2',
                        title: 'Setting Up Your Account for the First Time',
                        categoryId: '5',
                        content: `<h1>Setting Up Your Account for the First Time</h1><p>Welcome to Door! Follow these simple steps to set up your account and start using your digital key.</p><h2>Step 1: Download the App</h2><ul><li>Download "Door" from the App Store (iOS) or Google Play Store (Android)</li><li>Ensure you have the latest version installed</li></ul><h2>Step 2: Create Your Account</h2><ol><li>Open the Door app</li><li>Tap "Create Account"</li><li>Enter your email address and create a secure password</li><li>Verify your email through the confirmation link sent to your inbox</li></ol><h2>Step 3: Connect to Your Building</h2><ol><li>Enter the building code provided by your property manager</li><li>Confirm your unit number or apartment details</li><li>Wait for approval from your property management team</li></ol><h2>Step 4: Set Up Your Profile</h2><ul><li>Add your name and profile photo</li><li>Configure notification preferences</li><li>Set up biometric authentication (Face ID/Touch ID) for quick access</li></ul><p>Once approved, you'll receive a notification confirming your access has been activated!</p>`
                    },
                    {
                        id: '3',
                        title: 'A Quick Tour of the App',
                        categoryId: '5',
                        content: `<h1>A Quick Tour of the App</h1><p>Get familiar with the Door app interface and discover all the features at your fingertips.</p><h2>Home Screen</h2><p>Your main dashboard shows:</p><ul><li><strong>Quick Unlock</strong>: Large unlock button for immediate door access</li><li><strong>Recent Activity</strong>: Your latest door entries and exits</li><li><strong>Active Keys</strong>: Digital keys currently available to you</li><li><strong>Smart Devices</strong>: Quick access to connected home automation</li></ul><h2>Navigation Menu</h2><h3>🏠 Home</h3><p>Your main dashboard with quick access to all essential features</p><h3>🔑 My Keys</h3><p>View and manage all your digital keys, including guest keys you've shared</p><h3>📊 Activity</h3><p>Detailed history of your access events and door usage</p><h3>👥 Guests</h3><p>Create, manage, and revoke temporary keys for visitors</p><h3>🏡 Smart Home</h3><p>Control connected devices, create scenes, and manage automations</p><h3>⚙️ Settings</h3><p>Account preferences, notifications, security settings, and more</p><h2>Quick Actions</h2><ul><li><strong>Swipe down</strong> on home screen for quick unlock</li><li><strong>3D Touch/Long press</strong> app icon for shortcuts</li><li><strong>Voice commands</strong> with Siri or Google Assistant integration</li></ul>`
                    },
                    
                    // Everyday Use (Category 6)
                    {
                        id: '4',
                        title: 'How to Unlock a Door with Your Phone',
                        categoryId: '6',
                        content: `<h1>How to Unlock a Door with Your Phone</h1><p>Unlocking doors with your Door app is simple and secure. Here are the different methods available to you.</p><h2>Method 1: Bluetooth Proximity</h2><ol><li>Approach the door with your phone</li><li>The app will automatically detect the nearby Door device</li><li>Tap the unlock notification that appears</li><li>The door will unlock within 2-3 seconds</li></ol><h2>Method 2: Manual Unlock</h2><ol><li>Open the Door app</li><li>Tap the large "Unlock" button on the home screen</li><li>Select the door you want to unlock from the list</li><li>Confirm the unlock action</li></ol><h2>Method 3: Widget/Quick Action</h2><ul><li><strong>iOS</strong>: Add Door widget to Control Center or use 3D Touch</li><li><strong>Android</strong>: Use Door widget on home screen or notification shortcuts</li></ul><h2>Troubleshooting Tips</h2><ul><li>Ensure Bluetooth is enabled on your device</li><li>Make sure you're within 10 feet of the door</li><li>Check that your access permissions are active</li><li>Restart the app if experiencing connection issues</li></ul><h2>Security Features</h2><p>All unlock attempts are logged and encrypted. You can view your access history in the Activity section of the app.</p>`
                    },
                    {
                        id: '5',
                        title: 'Viewing Your Personal Access History',
                        categoryId: '6',
                        content: `<h1>Viewing Your Personal Access History</h1><p>Keep track of your door access activity with detailed history logs available in your Door app.</p><h2>Accessing Your History</h2><ol><li>Open the Door app</li><li>Tap "Activity" in the bottom navigation</li><li>View your chronological access history</li></ol><h2>Understanding Your Activity Log</h2><p>Each entry shows:</p><ul><li><strong>Date & Time</strong>: When the access occurred</li><li><strong>Door Location</strong>: Which door was accessed (e.g., "Main Entrance", "Unit 4B")</li><li><strong>Access Method</strong>: How you unlocked (App, Bluetooth, Guest Key)</li><li><strong>Status</strong>: Success or failed attempt</li><li><strong>Duration</strong>: How long the door remained unlocked</li></ul><h2>Filtering and Search</h2><ul><li><strong>Date Range</strong>: Filter by specific time periods</li><li><strong>Door Type</strong>: Show only specific doors</li><li><strong>Access Method</strong>: Filter by unlock method</li><li><strong>Search</strong>: Find specific events by keyword</li></ul><h2>Export Options</h2><p>You can export your access history for:</p><ul><li>Personal records</li><li>Insurance purposes</li><li>Security audits</li><li>Sharing with property management if needed</li></ul><h2>Privacy & Security</h2><p>Your access history is:</p><ul><li>Encrypted and stored securely</li><li>Only visible to you and authorized property staff</li><li>Automatically archived after 12 months</li><li>Never shared with third parties</li></ul>`
                    },
                    {
                        id: '6',
                        title: 'Managing Your Account Profile and Settings',
                        categoryId: '6',
                        content: `<h1>Managing Your Account Profile and Settings</h1><p>Customize your Door app experience and manage your account preferences through the settings menu.</p><h2>Profile Settings</h2><h3>Personal Information</h3><ul><li><strong>Name</strong>: Update your display name</li><li><strong>Photo</strong>: Add or change your profile picture</li><li><strong>Contact Info</strong>: Manage email and phone number</li><li><strong>Emergency Contact</strong>: Set up emergency contact information</li></ul><h2>Security Settings</h2><h3>Authentication</h3><ul><li><strong>Biometric Lock</strong>: Enable Face ID, Touch ID, or fingerprint</li><li><strong>PIN Protection</strong>: Add an additional PIN for app access</li><li><strong>Auto-lock Timer</strong>: Set how long before app locks automatically</li></ul><h3>Access Control</h3><ul><li><strong>Bluetooth Range</strong>: Adjust proximity unlock sensitivity</li><li><strong>Quick Unlock</strong>: Enable/disable instant unlock features</li><li><strong>Voice Commands</strong>: Configure Siri/Google Assistant integration</li></ul><h2>Notification Preferences</h2><ul><li><strong>Access Alerts</strong>: Get notified when doors are unlocked</li><li><strong>Guest Activity</strong>: Receive updates on guest key usage</li><li><strong>System Updates</strong>: Stay informed about app and system changes</li><li><strong>Marketing</strong>: Opt-in/out of promotional communications</li></ul><h2>Privacy Controls</h2><ul><li><strong>Data Sharing</strong>: Control what information is shared</li><li><strong>Location Services</strong>: Manage location-based features</li><li><strong>Activity Visibility</strong>: Set who can see your access patterns</li></ul><h2>App Preferences</h2><ul><li><strong>Theme</strong>: Choose between light, dark, or auto themes</li><li><strong>Language</strong>: Select your preferred language</li><li><strong>Measurements</strong>: Imperial or metric units</li><li><strong>Startup Screen</strong>: Choose default app screen</li></ul>`
                    },

                    // Add sample articles for other categories
                    {
                        id: '7',
                        title: 'How to Share a Temporary Key with a Guest',
                        categoryId: '7',
                        content: `<h1>How to Share a Temporary Key with a Guest</h1><p>Easily provide secure, temporary access to visitors using the Door app's guest key feature.</p><h2>Creating a Guest Key</h2><ol><li>Open the Door app and tap "Guests"</li><li>Tap "+ New Guest Key"</li><li>Enter guest information (name, phone/email)</li><li>Set access permissions and schedule</li><li>Choose which doors they can access</li><li>Set start and end dates/times</li><li>Send the invitation</li></ol><h2>Access Options</h2><ul><li><strong>Time-limited</strong>: Set specific start and end times</li><li><strong>Usage-limited</strong>: Limit number of uses</li><li><strong>Door-specific</strong>: Choose which doors guest can access</li><li><strong>Recurring</strong>: Set up regular access patterns</li></ul><p>Your guest will receive instructions via SMS or email on how to use their temporary access.</p>`
                    },

                    // Visiting a Property Articles
                    {
                        id: '8',
                        title: 'How to Accept a Shared Key Invitation',
                        categoryId: '10',
                        content: `<h1>How to Accept a Shared Key Invitation</h1><p>When someone shares a temporary key with you, follow these steps to gain access to their building.</p><h2>Receiving Your Invitation</h2><p>You'll receive an invitation via:</p><ul><li>SMS text message with a link</li><li>Email with instructions</li><li>QR code to scan</li></ul><h2>Setting Up Access</h2><ol><li>Download the Door app if you don't have it</li><li>Tap the invitation link or scan the QR code</li><li>Create a guest account or sign in</li><li>Accept the shared key invitation</li><li>Review your access permissions and schedule</li></ol><h2>Important Notes</h2><ul><li>Guest keys are temporary and will expire automatically</li><li>You can only access the doors specified by the host</li><li>Your access is limited to the dates and times set by the host</li><li>All your access activity is logged and visible to the host</li></ul>`
                    },

                    // Managing a Property Articles
                    {
                        id: '9',
                        title: 'What is the Door Manager? A Complete Overview',
                        categoryId: '12',
                        content: `<h1>What is the Door Manager? A Complete Overview</h1><p>Door Manager is a comprehensive web-based platform designed for property managers, landlords, and building staff to manage access control across their properties.</p><h2>Key Features</h2><h3>Centralized Management</h3><ul><li>Manage multiple buildings from one dashboard</li><li>Control all doors and access points</li><li>Oversee resident and visitor access</li></ul><h3>User Administration</h3><ul><li>Add, remove, and edit resident profiles</li><li>Issue and revoke digital keys</li><li>Manage staff and contractor access</li></ul><h3>Monitoring & Analytics</h3><ul><li>Real-time access monitoring</li><li>Detailed activity reports</li><li>Security event notifications</li><li>Usage analytics and insights</li></ul><h3>Advanced Controls</h3><ul><li>Create custom access groups</li><li>Set door schedules and lockdowns</li><li>Manage integration with other systems</li></ul><h2>Getting Started</h2><p>Access Door Manager through your web browser at manager.door.com using your administrator credentials provided during setup.</p>`
                    },

                    // Installing Devices Articles
                    {
                        id: '10',
                        title: 'Device Overview: Types of Door Access Hardware',
                        categoryId: '16',
                        content: `<h1>Device Overview: Types of Door Access Hardware</h1><p>Understanding the different types of Door hardware available for installation will help you choose the right solution for each access point.</p><h2>Door Controllers</h2><h3>Smart Lock Controller</h3><ul><li><strong>Use Case</strong>: Individual unit doors, office entrances</li><li><strong>Features</strong>: Bluetooth, Wi-Fi, mechanical backup</li><li><strong>Power</strong>: Battery or hardwired options</li><li><strong>Installation</strong>: Replaces existing deadbolt</li></ul><h3>Strike Plate Controller</h3><ul><li><strong>Use Case</strong>: Main building entrances, lobby doors</li><li><strong>Features</strong>: Electric strike integration, fail-safe operation</li><li><strong>Power</strong>: 12V DC, low voltage wiring</li><li><strong>Installation</strong>: Integrates with existing strike plates</li></ul><h2>Access Readers</h2><h3>Bluetooth Proximity Reader</h3><ul><li><strong>Use Case</strong>: High-traffic areas, hands-free access</li><li><strong>Range</strong>: Configurable 3-30 feet</li><li><strong>Mounting</strong>: Wall-mounted, weather-resistant</li></ul><h3>Mobile App Reader</h3><ul><li><strong>Use Case</strong>: Secure areas requiring manual unlock</li><li><strong>Features</strong>: QR code backup, manual override</li><li><strong>Installation</strong>: Minimal hardware requirements</li></ul><h2>System Components</h2><ul><li><strong>Bridge Units</strong>: Network connectivity hubs</li><li><strong>Power Supplies</strong>: Centralized or distributed power</li><li><strong>Backup Systems</strong>: Battery backup and mechanical overrides</li></ul>`
                    }
                ]
        };
        this.saveData();
    }

    saveData() {
        localStorage.setItem('doorSupportData', JSON.stringify(this.data));
    }

    setupEventListeners() {
        // Admin modal
        document.getElementById('adminBtn').addEventListener('click', () => {
            document.getElementById('adminModal').classList.add('active');
        });

        document.getElementById('closeAdminModal').addEventListener('click', () => {
            document.getElementById('adminModal').classList.remove('active');
        });

        // Preview modal
        document.getElementById('closePreviewModal').addEventListener('click', () => {
            document.getElementById('previewModal').classList.remove('active');
        });

        // Edit category modal
        document.getElementById('closeEditCategoryModal').addEventListener('click', () => {
            document.getElementById('editCategoryModal').classList.remove('active');
        });

        document.getElementById('cancelEditCategory').addEventListener('click', () => {
            document.getElementById('editCategoryModal').classList.remove('active');
        });

        document.getElementById('editCategoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEditedCategory();
        });

        // Admin tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Forms
        document.getElementById('categoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createCategory();
        });

        document.getElementById('articleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createArticle();
        });

        // Image upload
        document.getElementById('addImageBtn').addEventListener('click', () => {
            document.getElementById('imageUpload').click();
        });

        document.getElementById('imageUpload').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Preview button
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.showPreview();
        });

        // Close modals on overlay click
        document.getElementById('adminModal').addEventListener('click', (e) => {
            if (e.target.id === 'adminModal') {
                document.getElementById('adminModal').classList.remove('active');
            }
        });

        document.getElementById('previewModal').addEventListener('click', (e) => {
            if (e.target.id === 'previewModal') {
                document.getElementById('previewModal').classList.remove('active');
            }
        });

        document.getElementById('editCategoryModal').addEventListener('click', (e) => {
            if (e.target.id === 'editCategoryModal') {
                document.getElementById('editCategoryModal').classList.remove('active');
            }
        });
    }

    initializeQuillEditor() {
        // Configure Quill with custom toolbar
        const toolbarOptions = [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'code-block'],
            ['clean']
        ];

        this.quillEditor = new Quill('#articleEditor', {
            theme: 'snow',
            placeholder: 'Escriba el contenido del artículo aquí...',
            modules: {
                toolbar: toolbarOptions
            }
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        document.getElementById(`${tabName}Tab`).style.display = 'block';

        if (tabName === 'articles') {
            this.updateArticleCategoryOptions();
        } else if (tabName === 'categories') {
            this.renderCategoryTree();
        }
    }

    createCategory() {
        const name = document.getElementById('categoryName').value.trim();
        const parentId = document.getElementById('parentCategory').value || null;
        const descriptionElement = document.getElementById('categoryDescriptionInput');
        const description = descriptionElement ? descriptionElement.value.trim() : '';

        if (!name) return;

        const newCategory = {
            id: Date.now().toString(),
            name,
            parentId,
            description: description || ''
        };

        this.data.categories.push(newCategory);
        this.saveData();
        this.renderNavigation();
        this.renderAdminData();

        // Reset form
        document.getElementById('categoryForm').reset();
    }

    createArticle() {
        const title = document.getElementById('articleTitle').value.trim();
        const categoryId = document.getElementById('articleCategory').value;
        const content = this.quillEditor.root.innerHTML;

        if (!title || !categoryId || !content || content === '<p><br></p>') return;

        if (this.currentEditingArticle) {
            // Update existing article
            const articleIndex = this.data.articles.findIndex(art => art.id === this.currentEditingArticle);
            if (articleIndex !== -1) {
                this.data.articles[articleIndex] = {
                    ...this.data.articles[articleIndex],
                    title,
                    categoryId,
                    content
                };
            }
            this.currentEditingArticle = null;
        } else {
            // Create new article
            const newArticle = {
                id: Date.now().toString(),
                title,
                categoryId,
                content
            };
            this.data.articles.push(newArticle);
        }

        this.saveData();
        this.renderNavigation();
        this.renderAdminData();

        // Reset form
        document.getElementById('articleForm').reset();
        this.quillEditor.setContents([]);
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const range = this.quillEditor.getSelection();
            const index = range ? range.index : 0;
            this.quillEditor.insertEmbed(index, 'image', e.target.result);
        };
        reader.readAsDataURL(file);
    }

    showPreview() {
        const title = document.getElementById('articleTitle').value.trim();
        const content = this.quillEditor.root.innerHTML;

        if (!title || !content || content === '<p><br></p>') {
            alert('Por favor, complete el título y contenido del artículo antes de previsualizar.');
            return;
        }

        const previewContent = document.getElementById('previewContent');
        previewContent.innerHTML = `<h1>${title}</h1>${content}`;
        
        document.getElementById('previewModal').classList.add('active');
    }

    renderNavigation() {
        const navigation = document.getElementById('navigation');
        const rootCategories = this.data.categories.filter(cat => !cat.parentId);

        navigation.innerHTML = '<div class="nav-section"><h3>Documentación</h3></div>';

        rootCategories.forEach(category => {
            this.renderCategoryNav(category, navigation);
        });
    }

    renderCategoryNav(category, container, level = 0) {
        const subcategories = this.data.categories.filter(cat => cat.parentId === category.id);
        const articles = this.data.articles.filter(article => article.categoryId === category.id);
        const hasChildren = subcategories.length > 0 || articles.length > 0;

        const categoryElement = document.createElement('a');
        categoryElement.href = '#';
        categoryElement.className = `nav-item nav-category`;
        if (level > 0) categoryElement.classList.add(`nav-subcategory`);
        if (hasChildren) categoryElement.classList.add('has-children');
        
        categoryElement.textContent = category.name;
        categoryElement.setAttribute('data-category-id', category.id);
        
        categoryElement.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (hasChildren) {
                // Toggle expand/collapse
                this.toggleCategoryExpansion(category.id, categoryElement);
            }
            
            this.updateBreadcrumb([category.name]);
            this.updateCategoryDescription(category.description);
        });
        
        container.appendChild(categoryElement);

        if (hasChildren) {
            // Create children container
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'nav-children collapsed';
            childrenContainer.setAttribute('data-parent-id', category.id);

            // Add subcategories
            subcategories.forEach(subcategory => {
                this.renderCategoryNav(subcategory, childrenContainer, level + 1);
            });

            // Add articles for this category
            articles.forEach(article => {
                const articleElement = document.createElement('a');
                articleElement.href = '#';
                articleElement.className = `nav-item nav-article`;
                articleElement.textContent = article.title;
                articleElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showArticle(article);
                });
                childrenContainer.appendChild(articleElement);
            });

            container.appendChild(childrenContainer);
        }
    }

    toggleCategoryExpansion(categoryId, categoryElement) {
        const childrenContainer = document.querySelector(`[data-parent-id="${categoryId}"]`);
        if (!childrenContainer) return;

        const isExpanded = categoryElement.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse
            categoryElement.classList.remove('expanded');
            childrenContainer.classList.remove('expanded');
            childrenContainer.classList.add('collapsed');
        } else {
            // Expand
            categoryElement.classList.add('expanded');
            childrenContainer.classList.remove('collapsed');
            childrenContainer.classList.add('expanded');
        }
    }

    showArticle(article) {
        this.currentArticle = article;
        const contentArea = document.getElementById('articleContent');
        
        // Display rich HTML content directly
        contentArea.innerHTML = article.content;

        // Update navigation active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.classList.add('active');

        // Generate table of contents
        this.generateTOC();

        // Update breadcrumb and description
        const category = this.data.categories.find(cat => cat.id === article.categoryId);
        const breadcrumb = [category?.name || 'Sin categoría', article.title];
        this.updateBreadcrumb(breadcrumb);
        this.updateCategoryDescription(category?.description || '');
    }

    generateTOC() {
        const contentArea = document.getElementById('articleContent');
        const headings = contentArea.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const tocContainer = document.getElementById('toc');

        if (headings.length === 0) {
            document.getElementById('tocContainer').style.display = 'none';
            return;
        }

        document.getElementById('tocContainer').style.display = 'block';
        tocContainer.innerHTML = '';

        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;

            const tocLink = document.createElement('a');
            tocLink.href = `#${id}`;
            tocLink.textContent = heading.textContent;
            tocLink.className = `toc-level-${heading.tagName.charAt(1)}`;
            
            tocLink.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth' });
                
                // Update active TOC item
                document.querySelectorAll('.toc a').forEach(link => {
                    link.classList.remove('active');
                });
                tocLink.classList.add('active');
            });

            tocContainer.appendChild(tocLink);
        });
    }

    updateBreadcrumb(items) {
        const breadcrumb = document.getElementById('breadcrumb');
        breadcrumb.innerHTML = items.map(item => 
            `<span class="breadcrumb-item">${item}</span>`
        ).join('');
    }

    updateCategoryDescription(description) {
        const descriptionElement = document.getElementById('categoryDescription');
        if (description && description.trim()) {
            descriptionElement.textContent = description.trim();
            descriptionElement.style.display = 'block';
        } else {
            descriptionElement.textContent = '';
            descriptionElement.style.display = 'none';
        }
    }

    renderAdminData() {
        this.updateParentCategoryOptions();
        this.updateArticleCategoryOptions();
        this.renderCategoryTree();
        this.renderArticleList();
    }

    renderCategoryTree() {
        const container = document.getElementById('categoryTree');
        const rootCategories = this.data.categories.filter(cat => !cat.parentId);
        
        container.innerHTML = '';
        
        if (rootCategories.length === 0) {
            container.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 20px;">No hay categorías creadas</p>';
            return;
        }

        rootCategories.forEach(category => {
            this.renderCategoryTreeNode(category, container, 0);
        });
    }

    renderCategoryTreeNode(category, container, level) {
        const item = document.createElement('div');
        item.className = 'tree-item';
        
        const subcategories = this.data.categories.filter(cat => cat.parentId === category.id);
        const hasChildren = subcategories.length > 0;
        
        // Determine category level and icon
        const categoryLevel = this.getCategoryLevel(category.id);
        const levelIcon = categoryLevel === 0 ? 'fas fa-folder' : categoryLevel === 1 ? 'fas fa-folder-open' : 'fas fa-file-alt';
        const levelLabel = categoryLevel === 0 ? 'Categoría Principal' : categoryLevel === 1 ? 'Subcategoría' : 'Subcategoría de Nivel 2';

        item.innerHTML = `
            <div class="tree-node ${hasChildren ? 'has-children' : ''} draggable" 
                 data-category-id="${category.id}" 
                 data-level="${categoryLevel}"
                 draggable="true">
                <div class="tree-node-content">
                    <i class="tree-node-icon ${levelIcon}"></i>
                    <span class="tree-node-name">${category.name}</span>
                    <span class="tree-node-level-indicator">${levelLabel}</span>
                    <input type="text" class="tree-node-edit-input" value="${category.name}">
                    <div class="tree-node-edit-actions">
                        <button class="edit-action-btn save">✓</button>
                        <button class="edit-action-btn cancel">✕</button>
                    </div>
                </div>
                <div class="tree-node-actions">
                    <button class="tree-action-btn edit" onclick="app.showEditCategoryModal('${category.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="tree-action-btn delete" onclick="app.deleteCategory('${category.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        // Add drag and drop event listeners
        const treeNode = item.querySelector('.tree-node');
        this.addDragAndDropListeners(treeNode, category.id);

        // Add edit functionality listeners
        this.addEditListeners(treeNode, category.id);

        if (hasChildren) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'tree-children';
            subcategories.forEach(subcategory => {
                this.renderCategoryTreeNode(subcategory, childrenContainer, level + 1);
            });
            item.appendChild(childrenContainer);

            // Add click handler for expand/collapse
            const treeNode = item.querySelector('.tree-node');
            treeNode.addEventListener('click', (e) => {
                if (e.target.closest('.tree-node-actions')) return;
                treeNode.classList.toggle('expanded');
                childrenContainer.style.display = treeNode.classList.contains('expanded') ? 'block' : 'none';
            });
            
            // Initially collapsed
            childrenContainer.style.display = 'none';
        }

        container.appendChild(item);
    }

    updateParentCategoryOptions() {
        const select = document.getElementById('parentCategory');
        select.innerHTML = '<option value="">📁 Categoría principal</option>';
        
        // Create hierarchical category options
        const rootCategories = this.data.categories.filter(cat => !cat.parentId);
        
        rootCategories.forEach(category => {
            this.addCategoryOption(select, category, 0);
        });
    }

    addCategoryOption(select, category, level) {
        const option = document.createElement('option');
        option.value = category.id;
        option.setAttribute('data-level', level.toString());
        
        // Create indentation and visual hierarchy
        const indent = '　'.repeat(level); // Using full-width space for better indentation
        const icon = level === 0 ? '📁' : level === 1 ? '📂' : '📄';
        const prefix = level === 0 ? '' : level === 1 ? '└─ ' : '　└─ ';
        
        option.textContent = `${indent}${prefix}${icon} ${category.name}`;
        
        // Add styling attributes for CSS
        if (level === 0) {
            option.style.fontWeight = '600';
            option.style.backgroundColor = '#f3f4f6';
        } else if (level === 1) {
            option.style.paddingLeft = '24px';
            option.style.color = '#4b5563';
        } else {
            option.style.paddingLeft = '36px';
            option.style.color = '#6b7280';
        }
        
        select.appendChild(option);

        // Add child categories recursively
        const children = this.data.categories.filter(cat => cat.parentId === category.id);
        children.forEach(child => {
            this.addCategoryOption(select, child, level + 1);
        });
    }

    updateArticleCategoryOptions() {
        const select = document.getElementById('articleCategory');
        select.innerHTML = '<option value="">📋 Seleccionar categoría</option>';
        
        // Create hierarchical category options for articles
        const rootCategories = this.data.categories.filter(cat => !cat.parentId);
        
        rootCategories.forEach(category => {
            this.addArticleCategoryOption(select, category, 0);
        });
    }

    addArticleCategoryOption(select, category, level) {
        const option = document.createElement('option');
        option.value = category.id;
        option.setAttribute('data-level', level.toString());
        
        // Create indentation and visual hierarchy
        const indent = '　'.repeat(level);
        const icon = level === 0 ? '📁' : level === 1 ? '📂' : '📄';
        const prefix = level === 0 ? '' : level === 1 ? '└─ ' : '　└─ ';
        
        option.textContent = `${indent}${prefix}${icon} ${category.name}`;
        
        // Add styling attributes
        if (level === 0) {
            option.style.fontWeight = '600';
            option.style.backgroundColor = '#f3f4f6';
        } else if (level === 1) {
            option.style.paddingLeft = '24px';
            option.style.color = '#4b5563';
        } else {
            option.style.paddingLeft = '36px';
            option.style.color = '#6b7280';
        }
        
        select.appendChild(option);

        // Add child categories recursively
        const children = this.data.categories.filter(cat => cat.parentId === category.id);
        children.forEach(child => {
            this.addArticleCategoryOption(select, child, level + 1);
        });
    }

    renderArticleList() {
        const container = document.getElementById('articleList');
        container.innerHTML = '';

        if (this.data.articles.length === 0) {
            container.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 20px;">No hay artículos creados</p>';
            return;
        }

        this.data.articles.forEach(article => {
            const item = document.createElement('div');
            item.className = 'article-item';
            
            const category = this.data.categories.find(cat => cat.id === article.categoryId);
            
            item.innerHTML = `
                <div class="item-info">
                    <h4>${article.title}</h4>
                    <p>Categoría: ${category?.name || 'Sin categoría'}</p>
                    ${category?.description ? `<p style="font-size: 11px; color: #9ca3af; margin-top: 4px;">${category.description}</p>` : ''}
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="app.editArticle('${article.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete" onclick="app.deleteArticle('${article.id}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            
            container.appendChild(item);
        });
    }

    deleteCategory(id) {
        if (confirm('¿Está seguro de que desea eliminar esta categoría? También se eliminarán todos los artículos de esta categoría.')) {
            // Remove category and its children
            this.data.categories = this.data.categories.filter(cat => cat.id !== id && cat.parentId !== id);
            
            // Remove articles in this category
            this.data.articles = this.data.articles.filter(art => art.categoryId !== id);
            
            this.saveData();
            this.renderNavigation();
            this.renderAdminData();
        }
    }

    deleteArticle(id) {
        if (confirm('¿Está seguro de que desea eliminar este artículo?')) {
            this.data.articles = this.data.articles.filter(art => art.id !== id);
            this.saveData();
            this.renderNavigation();
            this.renderAdminData();
        }
    }

    editCategory(id) {
        const category = this.data.categories.find(cat => cat.id === id);
        if (category) {
            document.getElementById('categoryName').value = category.name;
            document.getElementById('parentCategory').value = category.parentId || '';
            const descriptionElement = document.getElementById('categoryDescriptionInput');
            if (descriptionElement) {
                descriptionElement.value = category.description || '';
            }
            
            // Switch to categories tab if not already there
            this.switchTab('categories');
        }
    }

    startEditCategory(id) {
        // Find the tree node
        const treeNode = document.querySelector(`[data-category-id="${id}"]`);
        if (!treeNode) return;

        // Cancel any other editing operations
        this.cancelAllEditing();

        // Enter edit mode
        const nameSpan = treeNode.querySelector('.tree-node-name');
        const editInput = treeNode.querySelector('.tree-node-edit-input');
        const editActions = treeNode.querySelector('.tree-node-edit-actions');
        const actions = treeNode.querySelector('.tree-node-actions');

        nameSpan.classList.add('editing');
        editInput.classList.add('active');
        editActions.classList.add('active');
        actions.style.display = 'none';

        editInput.focus();
        editInput.select();

        // Store original value for cancel
        editInput.setAttribute('data-original-value', nameSpan.textContent);
    }

    addEditListeners(treeNode, categoryId) {
        const editInput = treeNode.querySelector('.tree-node-edit-input');
        const saveBtn = treeNode.querySelector('.edit-action-btn.save');
        const cancelBtn = treeNode.querySelector('.edit-action-btn.cancel');

        // Save on Enter key
        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.saveEditCategory(categoryId);
            } else if (e.key === 'Escape') {
                this.cancelEditCategory(categoryId);
            }
        });

        // Save button
        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.saveEditCategory(categoryId);
        });

        // Cancel button
        cancelBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.cancelEditCategory(categoryId);
        });

        // Cancel on blur (clicking outside)
        editInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (!treeNode.contains(document.activeElement)) {
                    this.cancelEditCategory(categoryId);
                }
            }, 100);
        });
    }

    saveEditCategory(categoryId) {
        const treeNode = document.querySelector(`[data-category-id="${categoryId}"]`);
        if (!treeNode) return;

        const editInput = treeNode.querySelector('.tree-node-edit-input');
        const newName = editInput.value.trim();

        if (!newName) {
            alert('El nombre de la categoría no puede estar vacío.');
            editInput.focus();
            return;
        }

        // Update the category in data
        const category = this.data.categories.find(cat => cat.id === categoryId);
        if (category) {
            category.name = newName;
            this.saveData();
            this.renderNavigation();
            this.renderAdminData();
        }
    }

    cancelEditCategory(categoryId) {
        const treeNode = document.querySelector(`[data-category-id="${categoryId}"]`);
        if (!treeNode) return;

        const nameSpan = treeNode.querySelector('.tree-node-name');
        const editInput = treeNode.querySelector('.tree-node-edit-input');
        const editActions = treeNode.querySelector('.tree-node-edit-actions');
        const actions = treeNode.querySelector('.tree-node-actions');

        // Restore original value
        const originalValue = editInput.getAttribute('data-original-value');
        editInput.value = originalValue;

        // Exit edit mode
        nameSpan.classList.remove('editing');
        editInput.classList.remove('active');
        editActions.classList.remove('active');
        actions.style.display = 'flex';
    }

    cancelAllEditing() {
        const editingNodes = document.querySelectorAll('.tree-node-edit-input.active');
        editingNodes.forEach(input => {
            const treeNode = input.closest('.tree-node');
            const categoryId = treeNode.getAttribute('data-category-id');
            this.cancelEditCategory(categoryId);
        });
    }

    addDragAndDropListeners(treeNode, categoryId) {
        // Drag start
        treeNode.addEventListener('dragstart', (e) => {
            treeNode.classList.add('dragging');
            e.dataTransfer.setData('text/plain', categoryId);
            e.dataTransfer.effectAllowed = 'move';
        });

        // Drag end
        treeNode.addEventListener('dragend', (e) => {
            treeNode.classList.remove('dragging');
            // Clean up all drag-over classes
            document.querySelectorAll('.tree-node').forEach(node => {
                node.classList.remove('drag-over', 'drop-target-above', 'drop-target-below');
            });
        });

        // Drag over
        treeNode.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            const draggingId = e.dataTransfer.getData('text/plain');
            if (draggingId === categoryId) return; // Can't drop on itself

            // Clean up previous drag-over states
            document.querySelectorAll('.tree-node').forEach(node => {
                node.classList.remove('drag-over', 'drop-target-above', 'drop-target-below');
            });

            // Determine drop position
            const rect = treeNode.getBoundingClientRect();
            const y = e.clientY;
            const top = rect.top;
            const bottom = rect.bottom;
            const height = bottom - top;
            
            if (y < top + height * 0.25) {
                treeNode.classList.add('drop-target-above');
            } else if (y > bottom - height * 0.25) {
                treeNode.classList.add('drop-target-below');
            } else {
                treeNode.classList.add('drag-over');
            }
        });

        // Drag leave
        treeNode.addEventListener('dragleave', (e) => {
            // Only remove classes if we're actually leaving the node
            if (!treeNode.contains(e.relatedTarget)) {
                treeNode.classList.remove('drag-over', 'drop-target-above', 'drop-target-below');
            }
        });

        // Drop
        treeNode.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggingId = e.dataTransfer.getData('text/plain');
            
            if (draggingId === categoryId) return; // Can't drop on itself

            // Determine drop type
            let dropType = 'child';
            if (treeNode.classList.contains('drop-target-above')) {
                dropType = 'before';
            } else if (treeNode.classList.contains('drop-target-below')) {
                dropType = 'after';
            }

            this.handleCategoryDrop(draggingId, categoryId, dropType);

            // Clean up
            document.querySelectorAll('.tree-node').forEach(node => {
                node.classList.remove('drag-over', 'drop-target-above', 'drop-target-below');
            });
        });
    }

    handleCategoryDrop(draggedId, targetId, dropType) {
        const draggedCategory = this.data.categories.find(cat => cat.id === draggedId);
        const targetCategory = this.data.categories.find(cat => cat.id === targetId);
        
        if (!draggedCategory || !targetCategory) return;

        // Prevent dropping a parent into its own child
        if (this.isDescendant(targetId, draggedId)) {
            alert('No se puede mover una categoría dentro de una de sus subcategorías.');
            return;
        }

        switch (dropType) {
            case 'child':
                // Make dragged category a child of target
                draggedCategory.parentId = targetId;
                break;
            case 'before':
            case 'after':
                // Make dragged category a sibling of target
                draggedCategory.parentId = targetCategory.parentId;
                
                // TODO: Implement ordering within siblings if needed
                break;
        }

        this.saveData();
        this.renderNavigation();
        this.renderAdminData();
    }

    isDescendant(ancestorId, descendantId) {
        const category = this.data.categories.find(cat => cat.id === descendantId);
        if (!category || !category.parentId) return false;
        if (category.parentId === ancestorId) return true;
        return this.isDescendant(ancestorId, category.parentId);
    }

    getCategoryLevel(categoryId) {
        const category = this.data.categories.find(cat => cat.id === categoryId);
        if (!category || !category.parentId) return 0;
        return 1 + this.getCategoryLevel(category.parentId);
    }

    showEditCategoryModal(categoryId) {
        const category = this.data.categories.find(cat => cat.id === categoryId);
        if (!category) return;

        // Store the current editing category ID
        this.currentEditingCategoryId = categoryId;

        // Populate the form
        document.getElementById('editCategoryName').value = category.name;
        document.getElementById('editCategoryDescriptionText').value = category.description || '';

        // Populate parent category options (excluding current category and its descendants)
        this.populateEditParentOptions(categoryId);
        document.getElementById('editCategoryParent').value = category.parentId || '';

        // Show the modal
        document.getElementById('editCategoryModal').classList.add('active');
    }

    populateEditParentOptions(excludeCategoryId) {
        const select = document.getElementById('editCategoryParent');
        select.innerHTML = '<option value="">📁 Categoría principal</option>';

        // Get root categories that are available (excluding the one being edited and its descendants)
        const rootCategories = this.data.categories.filter(cat => {
            if (cat.id === excludeCategoryId) return false;
            if (this.isDescendant(excludeCategoryId, cat.id)) return false;
            return !cat.parentId;
        });

        rootCategories.forEach(category => {
            this.addEditParentOption(select, category, 0, excludeCategoryId);
        });
    }

    addEditParentOption(select, category, level, excludeCategoryId) {
        const option = document.createElement('option');
        option.value = category.id;
        option.setAttribute('data-level', level.toString());
        
        // Create indentation and visual hierarchy
        const indent = '　'.repeat(level);
        const icon = level === 0 ? '📁' : level === 1 ? '📂' : '📄';
        const prefix = level === 0 ? '' : level === 1 ? '└─ ' : '　└─ ';
        
        option.textContent = `${indent}${prefix}${icon} ${category.name}`;
        
        // Add styling attributes
        if (level === 0) {
            option.style.fontWeight = '600';
            option.style.backgroundColor = '#f3f4f6';
        } else if (level === 1) {
            option.style.paddingLeft = '24px';
            option.style.color = '#4b5563';
        } else {
            option.style.paddingLeft = '36px';
            option.style.color = '#6b7280';
        }
        
        select.appendChild(option);

        // Add child categories recursively (excluding those that would create circular references)
        const children = this.data.categories.filter(cat => {
            if (cat.parentId !== category.id) return false;
            if (cat.id === excludeCategoryId) return false;
            if (this.isDescendant(excludeCategoryId, cat.id)) return false;
            return true;
        });
        
        children.forEach(child => {
            this.addEditParentOption(select, child, level + 1, excludeCategoryId);
        });
    }

    saveEditedCategory() {
        const categoryId = this.currentEditingCategoryId;
        const category = this.data.categories.find(cat => cat.id === categoryId);
        if (!category) return;

        const newName = document.getElementById('editCategoryName').value.trim();
        const newParentId = document.getElementById('editCategoryParent').value || null;
        const newDescription = document.getElementById('editCategoryDescriptionText').value.trim();

        if (!newName) {
            alert('El nombre de la categoría no puede estar vacío.');
            return;
        }

        // Check if the new parent would create a circular reference
        if (newParentId && this.isDescendant(categoryId, newParentId)) {
            alert('No se puede mover una categoría dentro de una de sus subcategorías.');
            return;
        }

        // Update the category
        category.name = newName;
        category.parentId = newParentId;
        category.description = newDescription;

        // Save and refresh
        this.saveData();
        this.renderNavigation();
        this.renderAdminData();

        // Close modal
        document.getElementById('editCategoryModal').classList.remove('active');
        this.currentEditingCategoryId = null;

        // Show success message
        // You could add a toast notification here if desired
    }

    editArticle(id) {
        const article = this.data.articles.find(art => art.id === id);
        if (article) {
            this.currentEditingArticle = id;
            this.switchTab('articles');
            
            document.getElementById('articleTitle').value = article.title;
            document.getElementById('articleCategory').value = article.categoryId;
            
            // Set Quill editor content
            this.quillEditor.root.innerHTML = article.content;
        }
    }
}

// Initialize the application
const app = new SupportSite();