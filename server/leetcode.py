def reverse_num(num):
    num = str(num)
    s1=''
    for char in num:
        s1 = char + s1
    return int(s1)


def reverse_and_add(num):

    rev_num = reverse_num(num)

    while num != rev_num:
        num = num + rev_num
        rev_num = reverse_num(num)
        
    return rev_num

        
