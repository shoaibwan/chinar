// Check authentication
const sessionId = localStorage.getItem('adminSessionId');
if (!sessionId) {
    window.location.href = '/9374205';
}

// Global variables
let currentContent = null;
let projectImageUrl = null;
let storyImageUrl = null;

// Load content on page load
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});

// Switch tabs
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.closest('.tab').classList.add('active');
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${tabName}-section`).classList.add('active');
}

// Show alert
function showAlert(message, type = 'success') {
    const alert = document.getElementById('globalAlert');
    alert.className = `alert alert-${type} show`;
    alert.textContent = message;
    
    setTimeout(() => {
        alert.classList.remove('show');
    }, 5000);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// API call helper
async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method: method,
        headers: {
            'X-Session-Id': sessionId
        }
    };
    
    if (body && !(body instanceof FormData)) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    } else if (body instanceof FormData) {
        options.body = body;
    }
    
    try {
        const response = await fetch(endpoint, options);
        const data = await response.json();
        
        if (response.status === 401) {
            localStorage.removeItem('adminSessionId');
            window.location.href = '/9374205';
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('API call error:', error);
        return { success: false, message: 'Network error occurred' };
    }
}

// Load content
async function loadContent() {
    const data = await apiCall('/admin/content');
    
    if (data && data.success) {
        currentContent = data.content;
        populateFields();
    } else {
        showAlert('Failed to load content', 'error');
    }
}

// Populate form fields
function populateFields() {
    if (!currentContent) return;
    
    // Home section
    document.getElementById('homeTitle').value = currentContent.home.title || '';
    document.getElementById('homeSubtitle').value = currentContent.home.subtitle || '';
    document.getElementById('homeDescription').value = currentContent.home.description || '';
    if (currentContent.home.backgroundImage) {
        showImagePreview('homeImagePreview', currentContent.home.backgroundImage);
    }
    
    // Mission section
    document.getElementById('missionTitle').value = currentContent.mission.title || '';
    document.getElementById('missionSubtitle').value = currentContent.mission.subtitle || '';
    document.getElementById('missionHeading').value = currentContent.mission.heading || '';
    document.getElementById('missionParagraph1').value = currentContent.mission.paragraph1 || '';
    document.getElementById('missionParagraph2').value = currentContent.mission.paragraph2 || '';
    if (currentContent.mission.image) {
        showImagePreview('missionImagePreview', currentContent.mission.image);
    }
    
    // About section
    document.getElementById('aboutTitle').value = currentContent.about.title || '';
    document.getElementById('aboutSubtitle').value = currentContent.about.subtitle || '';
    document.getElementById('aboutHeading').value = currentContent.about.heading || '';
    document.getElementById('aboutParagraph1').value = currentContent.about.paragraph1 || '';
    document.getElementById('aboutParagraph2').value = currentContent.about.paragraph2 || '';
    document.getElementById('aboutParagraph3').value = currentContent.about.paragraph3 || '';
    if (currentContent.about.image) {
        showImagePreview('aboutImagePreview', currentContent.about.image);
    }
    
    // Impact section
    document.getElementById('impactTitle').value = currentContent.impact.title || '';
    document.getElementById('impactSubtitle').value = currentContent.impact.subtitle || '';
    if (currentContent.impact.stats && currentContent.impact.stats.length >= 4) {
        document.getElementById('stat1Number').value = currentContent.impact.stats[0].number || '';
        document.getElementById('stat1Label').value = currentContent.impact.stats[0].label || '';
        document.getElementById('stat2Number').value = currentContent.impact.stats[1].number || '';
        document.getElementById('stat2Label').value = currentContent.impact.stats[1].label || '';
        document.getElementById('stat3Number').value = currentContent.impact.stats[2].number || '';
        document.getElementById('stat3Label').value = currentContent.impact.stats[2].label || '';
        document.getElementById('stat4Number').value = currentContent.impact.stats[3].number || '';
        document.getElementById('stat4Label').value = currentContent.impact.stats[3].label || '';
    }
    
    // Logo
    if (currentContent.logo) {
        showImagePreview('logoImagePreview', currentContent.logo);
    }
    
    // Favicon
    if (currentContent.favicon) {
        const faviconPreview = document.getElementById('faviconImagePreview');
        faviconPreview.innerHTML = `<p style="color: #2ecc71; padding: 20px; text-align: center;"><i class="fas fa-check-circle"></i> Current favicon: ${currentContent.favicon}</p>`;
        
        // Update favicon in browser
        const faviconLink = document.getElementById('favicon');
        if (faviconLink) {
            faviconLink.href = currentContent.favicon;
        }
    }
    
    // Projects
    renderProjects();
    
    // Stories
    renderStories();
}

// Show image preview
function showImagePreview(elementId, imageUrl) {
    const preview = document.getElementById(elementId);
    preview.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
}

// Upload image
async function uploadImage(section, input) {
    const file = input.files[0];
    if (!file) return;
    
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
        showAlert('File size must be less than 5MB', 'error');
        input.value = '';
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showAlert('Please select an image file', 'error');
        input.value = '';
        return;
    }
    
    const infoElement = document.getElementById(`${section}ImageInfo`);
    infoElement.classList.add('show');
    infoElement.innerHTML = '<div class="loader"></div> Uploading...';
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
        const response = await fetch('/admin/upload-image', {
            method: 'POST',
            headers: {
                'X-Session-Id': sessionId
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            infoElement.innerHTML = `<i class="fas fa-check-circle"></i> Uploaded successfully`;
            showImagePreview(`${section}ImagePreview`, data.imageUrl);
            
            // Update the image in content
            const updateData = await apiCall('/admin/update-image', 'POST', {
                section: section,
                imageUrl: data.imageUrl
            });
            
            if (updateData && updateData.success) {
                showAlert(`${section.charAt(0).toUpperCase() + section.slice(1)} image updated successfully`);
                
                // Reload content to update currentContent
                await loadContent();
            } else {
                showAlert('Failed to update image reference', 'error');
            }
        } else {
            infoElement.innerHTML = `<i class="fas fa-times-circle"></i> Upload failed`;
            showAlert(data.message || 'Upload failed', 'error');
        }
    } catch (error) {
        console.error('Upload error:', error);
        infoElement.innerHTML = `<i class="fas fa-times-circle"></i> Upload failed`;
        showAlert('Upload error occurred', 'error');
    }
    
    input.value = '';
}

// Upload branding files (logo/favicon) with old file deletion
async function uploadBrandingFile(type, input) {
    const file = input.files[0];
    if (!file) return;
    
    // Validate file type
    if (type === 'logo' && file.type !== 'image/png') {
        showAlert('Logo must be in PNG format', 'error');
        input.value = '';
        return;
    }
    
    if (type === 'favicon' && file.type !== 'image/x-icon' && file.type !== 'image/vnd.microsoft.icon') {
        showAlert('Favicon must be in ICO format', 'error');
        input.value = '';
        return;
    }
    
    // Validate file size
    const maxSize = type === 'favicon' ? 1 * 1024 * 1024 : 5 * 1024 * 1024; // 1MB for favicon, 5MB for logo
    if (file.size > maxSize) {
        const maxSizeMB = type === 'favicon' ? '1MB' : '5MB';
        showAlert(`File size must be less than ${maxSizeMB}`, 'error');
        input.value = '';
        return;
    }
    
    const infoElement = document.getElementById(`${type}ImageInfo`);
    infoElement.classList.add('show');
    infoElement.innerHTML = '<div class="loader"></div> Uploading...';
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);
    
    try {
        const response = await fetch('/admin/upload-branding', {
            method: 'POST',
            headers: {
                'X-Session-Id': sessionId
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            infoElement.innerHTML = `<i class="fas fa-check-circle"></i> Uploaded successfully`;
            
            if (type === 'logo') {
                showImagePreview(`${type}ImagePreview`, data.imageUrl);
            } else {
                // Favicon preview
                const preview = document.getElementById(`${type}ImagePreview`);
                preview.innerHTML = `<p style="color: #2ecc71; padding: 20px; text-align: center;"><i class="fas fa-check-circle"></i> Favicon uploaded: ${data.imageUrl}</p>`;
            }
            
            showAlert(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully. The new ${type} will be reflected after page refresh.`);
            
            // Reload content to update currentContent
            await loadContent();
            
            // For favicon, suggest page reload
            if (type === 'favicon') {
                setTimeout(() => {
                    if (confirm('Favicon updated! Would you like to reload the page to see the new favicon?')) {
                        window.location.reload();
                    }
                }, 1000);
            }
        } else {
            infoElement.innerHTML = `<i class="fas fa-times-circle"></i> Upload failed`;
            showAlert(data.message || 'Upload failed', 'error');
        }
    } catch (error) {
        console.error('Upload error:', error);
        infoElement.innerHTML = `<i class="fas fa-times-circle"></i> Upload failed`;
        showAlert('Upload error occurred', 'error');
    }
    
    input.value = '';
}

// Remove image from section
async function removeSectionImage(section) {
    if (!confirm(`Are you sure you want to remove the ${section} image?`)) return;
    
    const data = await apiCall('/admin/remove-section-image', 'POST', {
        section: section
    });
    
    if (data && data.success) {
        showAlert(`${section.charAt(0).toUpperCase() + section.slice(1)} image removed successfully`);
        
        // Clear the preview
        const preview = document.getElementById(`${section}ImagePreview`);
        if (preview) {
            preview.innerHTML = '<p style="color: #999; padding: 20px; text-align: center;">No image</p>';
        }
        
        // Reload content
        await loadContent();
    } else {
        showAlert(data?.message || 'Failed to remove image', 'error');
    }
}

// Form submissions
document.getElementById('homeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = await apiCall('/admin/update-home', 'POST', {
        title: document.getElementById('homeTitle').value,
        subtitle: document.getElementById('homeSubtitle').value,
        description: document.getElementById('homeDescription').value
    });
    
    if (data && data.success) {
        showAlert('Home content updated successfully');
        await loadContent();
    } else {
        showAlert(data?.message || 'Update failed', 'error');
    }
});

document.getElementById('missionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = await apiCall('/admin/update-mission', 'POST', {
        title: document.getElementById('missionTitle').value,
        subtitle: document.getElementById('missionSubtitle').value,
        heading: document.getElementById('missionHeading').value,
        paragraph1: document.getElementById('missionParagraph1').value,
        paragraph2: document.getElementById('missionParagraph2').value
    });
    
    if (data && data.success) {
        showAlert('Mission content updated successfully');
        await loadContent();
    } else {
        showAlert(data?.message || 'Update failed', 'error');
    }
});

document.getElementById('aboutForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = await apiCall('/admin/update-about', 'POST', {
        title: document.getElementById('aboutTitle').value,
        subtitle: document.getElementById('aboutSubtitle').value,
        heading: document.getElementById('aboutHeading').value,
        paragraph1: document.getElementById('aboutParagraph1').value,
        paragraph2: document.getElementById('aboutParagraph2').value,
        paragraph3: document.getElementById('aboutParagraph3').value
    });
    
    if (data && data.success) {
        showAlert('About content updated successfully');
        await loadContent();
    } else {
        showAlert(data?.message || 'Update failed', 'error');
    }
});

document.getElementById('impactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const stats = [
        {
            number: document.getElementById('stat1Number').value,
            label: document.getElementById('stat1Label').value,
            icon: 'fas fa-users'
        },
        {
            number: document.getElementById('stat2Number').value,
            label: document.getElementById('stat2Label').value,
            icon: 'fas fa-project-diagram'
        },
        {
            number: document.getElementById('stat3Number').value,
            label: document.getElementById('stat3Label').value,
            icon: 'fas fa-hands-helping'
        },
        {
            number: document.getElementById('stat4Number').value,
            label: document.getElementById('stat4Label').value,
            icon: 'fas fa-globe'
        }
    ];
    
    const data = await apiCall('/admin/update-impact', 'POST', {
        title: document.getElementById('impactTitle').value,
        subtitle: document.getElementById('impactSubtitle').value,
        stats: stats
    });
    
    if (data && data.success) {
        showAlert('Impact statistics updated successfully');
        await loadContent();
    } else {
        showAlert(data?.message || 'Update failed', 'error');
    }
});

// Projects management
function renderProjects() {
    const projectList = document.getElementById('projectList');
    
    if (!currentContent || !currentContent.projects || currentContent.projects.length === 0) {
        projectList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No projects added yet</p>';
        return;
    }
    
    projectList.innerHTML = currentContent.projects.map(project => `
        <div class="project-item">
            <img src="${project.image}" alt="${project.title}" class="item-image">
            <div class="item-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <small><i class="${project.icon}"></i> ${project.icon}</small>
            </div>
            <div class="item-actions">
                <button class="btn btn-danger btn-small" onclick="deleteProject(${project.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function previewProjectImage(input) {
    const file = input.files[0];
    if (!file) return;
    
    // Validate
    if (file.size > 5 * 1024 * 1024) {
        showAlert('File size must be less than 5MB', 'error');
        input.value = '';
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        showAlert('Please select an image file', 'error');
        input.value = '';
        return;
    }
    
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('projectImagePreview').innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
}

document.getElementById('addProjectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('projectImageFile');
    if (!fileInput.files[0]) {
        showAlert('Please select an image for the project', 'error');
        return;
    }
    
    // Upload image first
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    
    const uploadResponse = await fetch('/admin/upload-image', {
        method: 'POST',
        headers: {
            'X-Session-Id': sessionId
        },
        body: formData
    });
    
    const uploadData = await uploadResponse.json();
    
    if (!uploadData.success) {
        showAlert('Failed to upload image', 'error');
        return;
    }
    
    // Add project
    const data = await apiCall('/admin/add-project', 'POST', {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        icon: document.getElementById('projectIcon').value || 'fas fa-star',
        image: uploadData.imageUrl
    });
    
    if (data && data.success) {
        showAlert('Project added successfully');
        document.getElementById('addProjectForm').reset();
        document.getElementById('projectImagePreview').innerHTML = '';
        await loadContent();
    } else {
        showAlert(data?.message || 'Failed to add project', 'error');
    }
});

async function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const data = await apiCall('/admin/delete-project', 'POST', { id });
    
    if (data && data.success) {
        showAlert('Project deleted successfully');
        await loadContent();
    } else {
        showAlert(data?.message || 'Failed to delete project', 'error');
    }
}

// Stories management
function renderStories() {
    const storyList = document.getElementById('storyList');
    
    if (!currentContent || !currentContent.stories || currentContent.stories.length === 0) {
        storyList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No stories added yet</p>';
        return;
    }
    
    storyList.innerHTML = currentContent.stories.map(story => `
        <div class="story-item">
            <img src="${story.image}" alt="${story.name}" class="item-image">
            <div class="item-content">
                <h3>${story.name}</h3>
                <p>${story.story}</p>
            </div>
            <div class="item-actions">
                <button class="btn btn-danger btn-small" onclick="deleteStory(${story.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function previewStoryImage(input) {
    const file = input.files[0];
    if (!file) return;
    
    // Validate
    if (file.size > 5 * 1024 * 1024) {
        showAlert('File size must be less than 5MB', 'error');
        input.value = '';
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        showAlert('Please select an image file', 'error');
        input.value = '';
        return;
    }
    
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('storyImagePreview').innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
}

document.getElementById('addStoryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('storyImageFile');
    if (!fileInput.files[0]) {
        showAlert('Please select an image for the story', 'error');
        return;
    }
    
    // Upload image first
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    
    const uploadResponse = await fetch('/admin/upload-image', {
        method: 'POST',
        headers: {
            'X-Session-Id': sessionId
        },
        body: formData
    });
    
    const uploadData = await uploadResponse.json();
    
    if (!uploadData.success) {
        showAlert('Failed to upload image', 'error');
        return;
    }
    
    // Add story
    const data = await apiCall('/admin/add-story', 'POST', {
        name: document.getElementById('storyName').value,
        story: document.getElementById('storyContent').value,
        image: uploadData.imageUrl
    });
    
    if (data && data.success) {
        showAlert('Story added successfully');
        document.getElementById('addStoryForm').reset();
        document.getElementById('storyImagePreview').innerHTML = '';
        await loadContent();
    } else {
        showAlert(data?.message || 'Failed to add story', 'error');
    }
});

async function deleteStory(id) {
    if (!confirm('Are you sure you want to delete this story?')) return;
    
    const data = await apiCall('/admin/delete-story', 'POST', { id });
    
    if (data && data.success) {
        showAlert('Story deleted successfully');
        await loadContent();
    } else {
        showAlert(data?.message || 'Failed to delete story', 'error');
    }
}

// Logout
async function logout() {
    if (!confirm('Are you sure you want to logout?')) return;
    
    await apiCall('/admin/logout', 'POST');
    localStorage.removeItem('adminSessionId');
    window.location.href = '/admin';
}
