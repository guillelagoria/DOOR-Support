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
            this.data = JSON.parse(savedData);
        } else {
            // Sample data
            this.data = {
                categories: [
                    { id: '1', name: 'Primeros Pasos', parentId: null, description: 'Todo lo que necesitas saber para comenzar con DOOR: instalación, configuración inicial y primeros pasos.' },
                    { id: '2', name: 'Instalación', parentId: '1', description: 'Guías detalladas para instalar DOOR en diferentes entornos y configuraciones de sistema.' },
                    { id: '3', name: 'Configuración', parentId: '1', description: 'Configuración inicial del sistema, usuarios, permisos y personalización de parámetros.' },
                    { id: '4', name: 'Funcionalidades', parentId: null, description: 'Descubre todas las características y capacidades avanzadas que ofrece la plataforma DOOR.' },
                    { id: '5', name: 'Control de Acceso', parentId: '4', description: 'Gestión completa de usuarios, tarjetas, códigos PIN y configuración de zonas de acceso.' },
                    { id: '6', name: 'Monitoreo', parentId: '4', description: 'Herramientas de monitoreo en tiempo real, reportes y análisis de actividad del sistema.' },
                    { id: '7', name: 'Soporte Técnico', parentId: null, description: 'Recursos de ayuda, solución de problemas comunes y contacto con nuestro equipo de soporte.' }
                ],
                articles: [
                    {
                        id: '1',
                        title: 'Bienvenido a DOOR',
                        categoryId: '1',
                        content: `<h1>Bienvenido a DOOR</h1><p>¡Gracias por elegir DOOR para sus necesidades de control de acceso inteligente!</p><h2>¿Qué es DOOR?</h2><p>DOOR es una plataforma integral de gestión de accesos que combina tecnología de vanguardia con facilidad de uso para brindar soluciones de seguridad inteligentes para edificios y espacios.</p><h2>Características principales</h2><h3>Control de Acceso Inteligente</h3><ul><li>Gestión centralizada de usuarios y permisos</li><li>Acceso mediante tarjetas, códigos PIN o aplicación móvil</li><li>Configuración flexible de horarios y zonas</li></ul><h3>Monitoreo en Tiempo Real</h3><ul><li>Visualización de eventos de acceso en tiempo real</li><li>Alertas automáticas de seguridad</li><li>Reportes detallados de actividad</li></ul><h3>Integración Avanzada</h3><ul><li>Compatible con sistemas de videovigilancia</li><li>Integración con sistemas de gestión de edificios</li><li>API para integraciones personalizadas</li></ul><h2>Primeros pasos</h2><ol><li><strong>Instalación</strong>: Revise nuestra guía de instalación para configurar su sistema</li><li><strong>Configuración</strong>: Configure usuarios, permisos y zonas de acceso</li><li><strong>Pruebas</strong>: Realice pruebas para verificar el correcto funcionamiento</li><li><strong>Capacitación</strong>: Capacite a su equipo en el uso del sistema</li></ol><p>¿Necesita ayuda? Consulte nuestra sección de soporte técnico o contacte a nuestro equipo.</p>`
                    },
                    {
                        id: '2',
                        title: 'Requisitos del Sistema',
                        categoryId: '2',
                        content: `<h1>Requisitos del Sistema</h1><p>Antes de instalar DOOR, asegúrese de que su sistema cumple con los siguientes requisitos.</p><h2>Requisitos de Hardware</h2><h3>Servidor Principal</h3><ul><li><strong>Procesador</strong>: Intel Core i5 o superior (recomendado: Intel Core i7)</li><li><strong>Memoria RAM</strong>: 8 GB mínimo (recomendado: 16 GB)</li><li><strong>Almacenamiento</strong>: 500 GB SSD (recomendado: 1 TB SSD)</li><li><strong>Red</strong>: Puerto Ethernet Gigabit</li></ul><h3>Controladores de Acceso</h3><ul><li><strong>Procesador</strong>: ARM Cortex-A7 o superior</li><li><strong>Memoria</strong>: 1 GB RAM, 8 GB almacenamiento</li><li><strong>Conectividad</strong>: Ethernet y Wi-Fi 802.11n</li><li><strong>Alimentación</strong>: 12V DC, 2A</li></ul><h2>Requisitos de Software</h2><h3>Sistema Operativo del Servidor</h3><ul><li>Ubuntu 20.04 LTS o superior</li><li>Windows Server 2019 o superior</li><li>CentOS 8 o superior</li></ul><h3>Base de Datos</h3><ul><li>PostgreSQL 12 o superior (recomendado)</li><li>MySQL 8.0 o superior</li><li>SQL Server 2019 o superior</li></ul><h3>Navegadores Web Compatibles</h3><ul><li>Chrome 90 o superior</li><li>Firefox 88 o superior</li><li>Safari 14 o superior</li><li>Edge 90 o superior</li></ul><h2>Requisitos de Red</h2><h3>Ancho de Banda</h3><ul><li><strong>Mínimo</strong>: 10 Mbps por cada 100 usuarios concurrentes</li><li><strong>Recomendado</strong>: 100 Mbps para instalaciones grandes</li></ul><h3>Puertos de Red</h3><ul><li><strong>HTTP</strong>: Puerto 80</li><li><strong>HTTPS</strong>: Puerto 443</li><li><strong>API</strong>: Puerto 8080</li><li><strong>Base de datos</strong>: Puerto 5432 (PostgreSQL) o 3306 (MySQL)</li></ul><h3>Configuración de Firewall</h3><p>Asegúrese de que los siguientes puertos estén abiertos:</p><ul><li>Puertos 80 y 443 para acceso web</li><li>Puerto 8080 para comunicación API</li><li>Puertos personalizados para controladores de acceso</li></ul><h2>Consideraciones de Seguridad</h2><ul><li><strong>Certificados SSL</strong>: Requeridos para producción</li><li><strong>VPN</strong>: Recomendado para acceso remoto</li><li><strong>Actualizaciones</strong>: Mantenga el sistema actualizado</li><li><strong>Backups</strong>: Configure respaldos automáticos diarios</li></ul>`
                    }
                ]
            };
            this.saveData();
        }
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
        
        item.innerHTML = `
            <div class="tree-node ${hasChildren ? 'has-children' : ''} draggable" 
                 data-category-id="${category.id}" 
                 draggable="true">
                <div class="tree-node-content">
                    <i class="tree-node-icon fas fa-folder"></i>
                    <span class="tree-node-name">${category.name}</span>
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
        select.innerHTML = '<option value="">Categoría principal</option>';
        
        this.data.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    }

    updateArticleCategoryOptions() {
        const select = document.getElementById('articleCategory');
        select.innerHTML = '<option value="">Seleccionar categoría</option>';
        
        this.data.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
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
        select.innerHTML = '<option value="">Categoría principal</option>';

        // Get all categories except the one being edited and its descendants
        const availableCategories = this.data.categories.filter(cat => {
            if (cat.id === excludeCategoryId) return false;
            if (this.isDescendant(excludeCategoryId, cat.id)) return false;
            return true;
        });

        availableCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
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