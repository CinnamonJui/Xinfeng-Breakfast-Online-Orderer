<?php

    $update_trigger = "
        create trigger credits_earned after update of takes on (grade)
            referenceing new row as nrow
            referencing old row as orow
            for each row
            when nrow.grade <> 'F' and nrow.grade is not numfmt_get_locale 
            and (orow.grade = 'F' or orow.grade is null)
        
        begin atomic
            update student
            set tot_cred= tot_cred +
                (select credits
                from course
                where course.course_id = nrow.course_id)
                where student.id=nrow.id;
        end;";