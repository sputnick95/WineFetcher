def addDigits(num):
    if num < 10:
        return num

    else:
        ls = []
        while num > 0:
            rem = num % 10
            ls.append(rem)
            num //= 10

        num = sum(ls)

        return addDigits(num)
    



def parentheses(num):
    if num == 0:
        return 0
    
    combinations = factorial_parenth(num)

    output = []
    combo =''
    while combinations > 0:
        n = num
        while n > 0:
            
            if combo =='' and num > 0:
                combo += '('
                open = True

            elif open == True and num > 0:
                combo += ')'
                num -=1
                open = False

            elif open == False and num > 0:
                combo += '('
                open = True

            elif num == 0 and combo not in output:    
                output.append(combo)
                combinations -= 1

    return output



def fact(num):
    y=1
    for i in range(1,num+1):
        y*=i
    return y

def factorial_parenth(n):
    fn = (fact(2*n))/(fact((n+1))*fact(n))
    return int(fn)


print(parentheses(1))

