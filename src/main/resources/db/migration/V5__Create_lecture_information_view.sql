
CREATE VIEW lecture_information_view
AS SELECT A.class_code, C.subject_name, B.professor_name, A.start_time, A.end_time,
A.location, A.dayofweek, A.selected_flag FROM class_tb A
LEFT JOIN professor_tb B USING (professor_id)
LEFT JOIN subject_tb C USING (subject_id);