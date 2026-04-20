function loadResources() {
    // Load jQuery
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    jqueryScript.onload = () => {
        // After jQuery loads, load our courses.js
        const coursesScript = document.createElement('script');
        coursesScript.src = './courses.js';
        coursesScript.onload = initializeApp;
        document.body.appendChild(coursesScript);
    };
    document.body.appendChild(jqueryScript);

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './styles.css';
    document.head.appendChild(link);
}

// Initialize the application
function initializeApp() {
    // Populate the course list
    const $coursesList = $('#courses');
    hannaCourses.forEach(course => {
        $coursesList.append(`<li>${course.course}</li>`);
    });

    // Handle course selection with click event
    $coursesList.on('click', 'li', function() {
                // Remove active class from all list items and add to clicked one
                $('li').removeClass('active');
                $(this).addClass('active');

                // Get the selected course
                const courseCode = $(this).text();
                const selectedCourse = hannaCourses.find(c => c.course === courseCode);

  $('#coursesDesc').html(`
    <div class="desc-container">
        <img src="${selectedCourse.img}" alt="${courseCode}">
        <p>${selectedCourse.descr}</p>
    </div>
`);
                // Update prerequisites
                let prereqsHtml = '<h3>No Prerequisites!</h3>';
                if (selectedCourse.prereqs.length > 0) {
                    prereqsHtml = `
                <h3>Complete the following: </h3>
                <ul>
                    ${selectedCourse.prereqs.map(prereq => `<li>${prereq}</li>`).join('')}
                </ul>
            `;
        }
        $('#coursesPrereqs').html(prereqsHtml);
    });

   

    // Select and display the first course automatically
    $coursesList.find('li').first().trigger('click');
}

document.addEventListener('DOMContentLoaded', loadResources);