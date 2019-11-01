package com.example.demo.model.vo;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LectureVO {

    @NotBlank
    @Size(min = 1, max = 20)
    String classCode;

    @NotBlank
    @Size(min = 1, max = 30)
    String subjectName;

    @NotBlank
    @Size(min = 1, max = 20)
    String professorName;

    @NotBlank
    @Min(0)
    @Min(24)
    byte startTime;

    @NotBlank
    @Min(0)
    @Min(24)
    byte endTime;

    @Size(min = 1, max = 20)
    String location;

    @NotBlank
    @Size(min = 1, max = 10)
    String dayOfWeek;

    boolean selectedFlag;
}
