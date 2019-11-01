package com.example.demo.model.vo;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class EntrustLectureTimeVO {
    @NotBlank
    @Size(min = 1, max = 20)
    String classCode;

    @NotBlank
    @Min(0)
    @Min(24)
    byte startTime;

    @NotBlank
    @Min(0)
    @Min(24)
    byte endTime;

    @NotBlank
    @Size(min = 1, max = 10)
    String dayOfWeek;
}
