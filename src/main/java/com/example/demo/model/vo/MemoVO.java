package com.example.demo.model.vo;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MemoVO {
    @Setter
    int memoId;

    @NotBlank
    @Size(min = 1, max = 20)
    String classCode;

    @Size(max = 20)
    String memoTitle;

    @Size(max = 100)
    String memoContent;

    public MemoVO(String classCode, String memoTitle, String memoContent){
        this.classCode = classCode;
        this.memoTitle = memoTitle;
        this.memoContent = memoContent;
    }
}
